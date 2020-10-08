// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const data = require('./boxes.json');

let genderConst;
let ageConst;
let petOrBOW;
let returningEntity;

const GetNoToInfoAPIHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getNoToInfo';

    },
    handle(handlerInput){
        const getBoxNameResult = handlerInput.requestEnvelope.request.apiRequest.arguments.getBoxNameResult;

        console.log("returning: ", getBoxNameResult);

        const response = buildSuccessApiResponse(getBoxNameResult);
        console.log("Response is: ", response);
        return response;
    }
}

const GetNoToPersonInfoAPIHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getNoToPersonInfo';
    },
    handle(handlerInput){
        const getPersonGroup = handlerInput.requestEnvelope.request.apiRequest.arguments.getPersonGroupName;

        console.log("******** In GetNoToPersonInfoAPIHandler ***********");
        const response = returningEntity;
        console.log("Response is: ", response);
        console.log("******* exiting: GetNoToPersonInfoAPIHandler *********")
        return response;
    }
}

const GetPetBoxNameAPIHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getPetBoxName';

    },
    handle(handlerInput){
        const typeName = handlerInput.requestEnvelope.request.apiRequest.arguments.typeName;

        let databaseResponse = `We have no information matching that ${typeName} box type`
        console.log("Entering GetPetBoxNameAPIHandler");
        const apiRequest = handlerInput.requestEnvelope.request.apiRequest;
        console.log("typeName is " + typeName);
        let type = resolveEntity(apiRequest.slots, "typeName");
        petOrBOW = type;

        console.log("type is " + type);

        const getBoxNameResultEntity = {};
        if(type !== null){
            console.log("in if type");
            const key = `${type}`;
            const databaseResponse = data[key];

            console.log("Response from mock database ", databaseResponse);

            getBoxNameResultEntity.name = databaseResponse.name;
            getBoxNameResultEntity.image = databaseResponse.image;
            getBoxNameResultEntity.type = type;
        }
        
        const response = buildSuccessApiResponse(getBoxNameResultEntity);
        console.log("GetPetBoxNameAPIHandler Response is: ", response);
        returningEntity = response;
        return response;
    }
}

const GetPersonBoxInfoAPIHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getPersonBoxInfo'
    },
    handle(handlerInput){
        //const getPersonGroupName = handlerInput.requestEnvelope.request.apiRequest.arguments.getPersonGroupName;
        console.log("******* Entering GetPersonBoxInfoAPIHandler *********");
        let key = `${genderConst}-${ageConst}`
        console.log("key is ", key);

        const databaseResponse = data[key];
        console.log("respose from mock database ", databaseResponse);

        const getPersonInfoSlotEntity = {};
        getPersonInfoSlotEntity.information = databaseResponse.information;
        getPersonInfoSlotEntity.name = databaseResponse.name;
        getPersonInfoSlotEntity.image = databaseResponse.image;
        getPersonInfoSlotEntity.paragraph1 = databaseResponse.paragraph1;
        getPersonInfoSlotEntity.paragraph2 = databaseResponse.paragraph2;
        getPersonInfoSlotEntity.paragraph3 = databaseResponse.paragraph3;

        const response = buildSuccessApiResponse(getPersonInfoSlotEntity);
        returningEntity = response;
        // console.log("returningEntity is ", returningEntity);
        console.log("GetPersonBoxInfoAPIHandler Response is: ", response);
        console.log("******* exiting: GetPersonBoxInfoAPIHandler **********");
        return response;
    }
}

const GetPetBoxInfoAPIHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getPetBoxInfo'
    },
    handle(handlerInput){
        const getBoxNameResult = handlerInput.requestEnvelope.request.apiRequest.arguments.getBoxNameResult;
        console.log("Entering GetPetBoxInfoAPIHandler");
        console.log('returningentity is ', returningEntity);
        console.log('petOrBOW is ', petOrBOW);
        console.log('getBoxNameResult is ', getBoxNameResult);
        let databaseResponse = `The infomation for the ${getBoxNameResult.type} is missing.`

        let type = getBoxNameResult.type;
        let name = getBoxNameResult.name;

        console.log("type is " + type + " and name is " + name);

        const getInformationEntity = {};

        if(type !== null){
            console.log("in if type");
            const key = `${type}`;
            const databaseResponse = data[key];

            console.log("Response from mock database ", databaseResponse);

            getInformationEntity.information = databaseResponse.information;
            getInformationEntity.name = databaseResponse.name;
            getInformationEntity.image = databaseResponse.image;
            getInformationEntity.paragraph1 = databaseResponse.paragraph1;
            getInformationEntity.paragraph2 = databaseResponse.paragraph2;
            getInformationEntity.paragraph3 = databaseResponse.paragraph3;
        }

        const response = buildSuccessApiResponse(getInformationEntity);
        console.log("GetPetBoxInfoAPIHandler Response if: ", response);
        return response;
    }
}

const GetPersonBoxNameAPIHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getPersonBoxName';
    },
    handle(handlerInput){
        const apiRequest = handlerInput.requestEnvelope.request.apiRequest;
        console.log("******* Entering GetPersonBoxNameAPIHandler ********");
        let gender = resolveEntity(apiRequest.slots, "genderGroup");
        let age = resolveEntity(apiRequest.slots, "ageGroup");
        genderConst = gender;
        ageConst = age;

        console.log("gender is ", gender);
        console.log("age is ", age);

        const getPersonGroupNameEntity = {};
        if(gender !== null && age !== null){
            const key = `${gender}-${age}`;
            console.log("key is ",key);

            const databaseResponse = data[key];
            console.log("response from mock database", databaseResponse);

            getPersonGroupNameEntity.gender = gender;
            getPersonGroupNameEntity.age = age;
            getPersonGroupNameEntity.person = "person";
            getPersonGroupNameEntity.name = databaseResponse.name;   
            getPersonGroupNameEntity.image = databaseResponse.image;
            
            console.log("returning: ", getPersonGroupNameEntity);
        }

        const response = buildSuccessApiResponse(getPersonGroupNameEntity);
        returningEntity = response;
        
        console.log("GetPersonBoxNameAPIHandler Response is: ", response);
        console.log("returningEntity is ", returningEntity);
        console.log("******* Exiting GetPersonBoxNameAPIHandler ********");
        return response;
    }
}

const GetDescriptionAPIHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
    && handlerInput.requestEnvelope.request.apiRequest.name === 'getDescription';

    },
    handle(handlerInput) {
        const recommendationResult = handlerInput.requestEnvelope.request.apiRequest.arguments.recommendationResult;

// setting the default response.
let databaseResponse = `I don't know much about ${recommendationResult.name}.`;

const energy = recommendationResult.energy;
const size = recommendationResult.size;
const temperament = recommendationResult.temperament;

// setting the actual response if we find a match for their preference
if (energy !== null && size !== null && temperament !== null) {
    const key = `${energy}-${size}-${temperament}`;
    databaseResponse = data[key];
}
const descriptionEntity = {
    description: databaseResponse.description
};
const response = buildSuccessApiResponse(descriptionEntity);
console.log('GetDescriptionAPIHandler', JSON.stringify(response));

return response;


    }
}

const GetRecommendationAPIHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
        && handlerInput.requestEnvelope.request.apiRequest.name === 'getRecommendation';
    },
    handle(handlerInput) {
        const apiRequest = handlerInput.requestEnvelope.request.apiRequest;

        let energy = resolveEntity(apiRequest.slots, "energy");
        let size = resolveEntity(apiRequest.slots, "size");
        let temperament = resolveEntity(apiRequest.slots, "temperament");

        const recommendationEntity = {};
        if (energy !== null && size !== null && temperament !== null) {
            const key = `${energy}-${size}-${temperament}`;
            const databaseResponse = data[key];

            console.log("Response from mock database ", databaseResponse);

            recommendationEntity.name = databaseResponse.breed;
            recommendationEntity.size = size
            recommendationEntity.energy = energy
            recommendationEntity.temperament = temperament;
    
        }
        const response = buildSuccessApiResponse(recommendationEntity);
        return response;
    }
};

// *****************************************************************************
// Resolves slot value using Entity Resolution
const resolveEntity = function(resolvedEntity, slot) {

    //This is built in functionality with SDK Using Alexa's ER
    console.log("resolved entity is ", resolvedEntity);
    console.log("slot is ", slot);
    let erAuthorityResolution = resolvedEntity[slot].resolutions
        .resolutionsPerAuthority[0];
    let value = null;

    if (erAuthorityResolution.status.code === 'ER_SUCCESS_MATCH') {
        value = erAuthorityResolution.values[0].value.name;
    }

    return value;
};

const buildSuccessApiResponse = (returnEntity) => {
    return { apiResponse: returnEntity };
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        GetPetBoxNameAPIHandler,
        GetPetBoxInfoAPIHandler,
        GetPersonBoxNameAPIHandler,
        GetNoToPersonInfoAPIHandler,
        GetPersonBoxInfoAPIHandler,
        GetNoToInfoAPIHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
