import Joi from "joi";
import * as Koa from "koa";

/**
 * Helper function to validate an object against the provided schema,
 * and to throw a custom error if object is not valid.
 *
 * @param {Object} object The object to be validated.
 * @param {String} label The label to use in the error message.
 * @param {JoiSchema} schema The Joi schema to validate the object against.
 */

function validateObject(
  object = {},
  label: string,
  schema: Joi.ObjectSchema<any>
) {
  // Skip validation if no schema is provided

  if (schema) {

    const { error, value } = schema.validate(object);
   
    if (error) {
      // Throw error with custom message if validation failed
      throw new Error(`Invalid ${label} - ${error.message}`);
    }
  }
}

/**
 * Generate a Koa middleware function to validate a request using
 * the provided validation objects.
 *
 * @param {Object} validationObj
 * @param {Object} validationObj.headers The request headers schema
 * @param {Object} validationObj.params The request params schema
 * @param {Object} validationObj.query The request query schema
 * @param {Object} validationObj.body The request body schema
 * @param {Object} validationObj.state The request body schema
 * @returns A validation middleware function.
 */
export function validate(validationObj: any) {
  // Return a Koa middleware function

  return (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      if (validationObj.params) {
        validateObject(
          ctx.params,
          "URL Parameters",
          Joi.object(validationObj.params)
        );
      }
      if (validationObj.query) {
        validateObject(ctx.request.query, "URL Query", Joi.object(validationObj.query));
      }

      if (validationObj.headers) {
        validateObject(
          ctx.headers,
          "Headers",
          Joi.object(validationObj.headers)
        );
      }
      if (validationObj.body) {
        validateObject(
          ctx.request.body,
          "Body",
          Joi.object(validationObj.body)
        );
      } 
    } catch (err) {
      // If any of the objects fails validation, send an HTTP 400 response.
      ctx.throw(400, err.message);
    }
    /*if (validationObj.user) {
      console.log(validationObj.user)
      console.log(ctx.state.user)
      try {
      validateObject(
        ctx.state.user,
        "Role",
        Joi.object(validationObj.user)
      );
     }  catch (err) {
      // If any of the objects fails validation, send an HTTP 401 response - forbidden.
      ctx.throw(403, err.message);
    }
    }*/
    return next();
  };
}