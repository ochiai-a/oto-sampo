const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

exports.handler = async (event) => {
    const params = {
        stateMachineArn: 'arn:aws:states:ap-northeast-1:654654257411:stateMachine:MyStateMachine-laxcrb4p2', // StepFunctionsのステートマシンのARNを入れる
        input: JSON.stringify(event)
    };

    try {
        const data = await stepfunctions.startExecution(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};
