# SMS Notifier
Super simple Twilio Function for sending bulk SMS 

----

1. Uses Twilio Functions to host static site.
2. Modified/based on [sms-notifications](https://github.com/twilio-labs/function-templates/tree/main/sms-notifications) 
   sample code
3. Uses Twilio Notify to send a simple text based SMS to all 
   bindings in selected service
4. Uses a very simple .env file to configure defaults
5. Protected by a single a passcode. Make sure to use a 
   long AF randomly generated one and stuff it thru
   SHA512 hashing before putting it in your dotenv
   
----

This service is not designed with the intent of running permanently. 
If you intend to run something similar for an extended period of 
time, particularly publicly, please, please, please implement additional 
security.

**Requires [Twilio-CLI](https://www.twilio.com/docs/twilio-cli/quickstart)**

Run Locally:
`twilio serverless:start`

Deploy: `twilio serverless:deploy`