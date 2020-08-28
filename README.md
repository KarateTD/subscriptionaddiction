# subscriptionaddiction
Code for Subscription Addiction Alexa skill

## Motivation
With so many subscription boxes, it's hard for [Shades of Gray](https://www.youtube.com/channel/UCUNXfWa_kgFMgQgmqJ6I9CQ) to review them all.  This skill will allow our subscribers to discover new boxes we found interesting but don't have time or the money to review them.

## Technology Used
Built with:
- [Alexa Conversations](https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2020/07/introducing-alexa-conversations-beta-a-new-ai-driven-approach-to-providing-conversational-experiences-that-feel-more-natural)
- [Alexa Skill Kit](https://developer.amazon.com/en-US/alexa/alexa-skills-kit)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS CodePipeline](https://aws.amazon.com/codepipeline/)
- [AWS CodeBuild](https://aws.amazon.com/codebuild/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [Alexa Presentation Language](https://developer.amazon.com/blogs/alexa/post/1dee3fa0-8c5f-4179-ab7a-74545ead24ce/introducing-the-alexa-presentation-language-preview)
- [GitHub](https://github.com/)
- [NodeJS 12.x](https://nodejs.org/en/)

## Features
This code features Alexa Conversations.  Alexa Converstions is driven by developer created dialogs and machine learning. Its built using CodePipeline, CodeBuild, and S3.

## Releases
Release-1.0.0: Initial Release using Alexa Conversations for [Echo](https://amzn.to/2YEvErY), [Echo Spot](https://amzn.to/3b4ZivB), [Echo Show 5](https://amzn.to/3jie9pp), [Echo Show 1 Gen](https://amzn.to/3hBrk4l), [Echo Show 2 Gen](https://amzn.to/3b3hPIu), [Fire TV](https://amzn.to/3ljvpwa) and all [Alexa-enabled devices](https://amzn.to/32usdoU) [(FTC Disclaimer)](https://thatdarngirlmoviereviews.wordpress.com/about/#disclaimer).  

## Code
- **index.js** - Contains code for the 6 API functions
    - _GetPetBoxNameAPIHandler_ - If the user request a pet box or box of the week, this API will return the box's name
    - _GetPersonBoxNameAPIHandler_ - After the user request person and provides the gender identification and age group, this API will return the box's name
    - _GetNoToInfoAPIHandler_ - If the user doesn't want more pet box or box of the week information, this API will return the box's name
    - _GetNoToPersonInfoAPIHandler_ - If user doesn't want more information about the person box, this API will return the box's name
    - _GetPetBoxInfoAPIHandler_ - If a user wants information about the pet box or the box of the week, this API will return the box's name, image, inforamtion, and paragraphs
    - _GetPersonBoxInfoAPIHandler_ - If a user wants information about a person box, this API will return the box's name, image, information, and paragraphs
    - All other handlers are taken care of by Machine Learning in Alexa Conversations.
- **boxes.js** - Contains information about boxes
    - _name_ - name of the box
    - _information_ - Alexa's speech about box's name, description, and price list
    - _image_ - image saved in S3 bucket
    - _paragraph1_ - Description only (for devices without circle screens)
    - _paragraph2_ - Price list
    - _paragraph3_ - Box's website

## Creation
First, you must have an account on the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask) and [Amazon Web Services](https://aws.amazon.com/).  Then create a new skill with an accompanying Lambda function.  In the Console, under Interfaces, turn on the Alexa Conversations.  Create dailogs to request a user's type of box (pet, person, box of the week).  For a person, request gender identification (male, female, neutral) and age group (baby, child, teen, adult).  Alert the user of their box and ask if they want more information.  If so, give them the boxes information.  If not, let the user know the box will be on the skill until Monday.

## Test
First, you must have an account on the Alexa Developer Console and Amazon Web Services to test. Create a pipeline with GitHub as your source.  Have the CodeBuild, build the code, zip the file, send the file to a develpment Lambda, and save the file in an S3 bucket.  Open your Alexa skill and click the "Test" tab. To start, say the following invocation "Open [Invocation of your choice]". Then follow the prompts. Listen for grammar and spelling errors.  If no erros are found, accept the manual test phase in the CodePipeline.  Have the pipeline, copy the code from S3 to the Production Lambda.

[CloudWatch](https://aws.amazon.com/cloudwatch/) logs for the Lambda function will display syntax and computation errors in the code.

## Suggestions
To make suggestions for code changes, fixes, or updates, please email shadesofgrayshow@gmail.com. 

## Credits
Shades of Gray