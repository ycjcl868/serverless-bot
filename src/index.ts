import axios from 'axios';
import jsonParse from 'safe-json-parse/result';
import Result from 'rust-result';
import getRawBody from 'raw-body';
import get from 'lodash.get';
import { verifySignature } from './utils';

/*
if you open the initializer feature, please implement the initializer function, as below:
module.exports.initializer = function(context, callback) {
    console.log('initializing');
    callback(null, '');
};
*/

module.exports.handler = async (req, resp, context) => {
    const { WEB_HOOK } = process.env;
    const body = await getRawBody(req, {
        length: req.headers['content-length'],
    });
    req.rawBody = body;
    req.body = Result.Ok(jsonParse(body));
    const isVerify = await verifySignature(req);

    resp.setHeader('content-type', 'application/json')

    if (!isVerify) {
        resp.setStatusCode(403);
        resp.send(JSON.stringify({
            status: 403,
            message: 'not from github',
        }))
    }

    const { head_commit } = req.body;


    const commiter = get(head_commit, 'committer.name', 'null');
    const hash = get(head_commit, 'id', '').slice(0, 5);
    const commitUrl = get(head_commit, 'url', '');
    const commitMsg = get(head_commit, 'message', '');

    const msg = `@${commiter} pushed repository\n > [${hash}](${commitUrl}): ${commitMsg}`
    const messageObj = {
        msgtype: 'markdown',
        markdown: {
            title: 'Github Push',
            content: msg,
            text: msg,
        }
    }

    try {
        const address = WEB_HOOK.split(',');
        const promiseArr = [];
        address.forEach(url => {
            promiseArr.push(axios.post(url, messageObj));
        });
        await Promise.all(promiseArr);
        resp.send(JSON.stringify({
            status: 200,
            message: 'push done',
        }));
    } catch (e) {
        resp.send(JSON.stringify({
            status: 500,
            e,
        }))
    }
};
