const {GuitarRepository} = require('./Services/GuitarRepository');

exports.lambdaHandler = async (event, context) => {
    const guitarRepository = new GuitarRepository();
    
    switch (event.httpMethod) {
    case "GET": 
        if (event.pathParameters && event.pathParameters.id)
            return await guitarRepository.get(event);
        else
            return await guitarRepository.list(event);
        break;
    case "POST":
        return await guitarRepository.create(event);
        break;
    case "DELETE":
        return await guitarRepository.delete(event);
        break;
    case "PUT":
        return await guitarRepository.update(event);
        break;
    default:
        const response = {
            statusCode: 401,
            body: {
                message: "not implemented verb"
            }
        }
        return response;
    }
};

//console.log(getGuitar());
//const guitarRepository = new GuitarRepository();
//guitarRepository.list();