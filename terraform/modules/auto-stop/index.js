const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();
const rds = new AWS.RDS();

exports.handler = async (event) => {
  try {
    // Detener EC2
    await ec2.stopInstances({ InstanceIds: [process.env.EC2_INSTANCE_ID] }).promise();
    
    // Detener RDS
    await rds.stopDBInstance({ DBInstanceIdentifier: process.env.RDS_INSTANCE_ID }).promise();
    
    return { status: 'OK' };
  } catch (error) {
    throw new Error(error);
  }
};