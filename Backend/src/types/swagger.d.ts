declare module 'swagger-ui-express';
declare module "swagger-jsdoc" {
  export interface Options {
    definition: object;
    apis: string[];
  }

  function swaggerJSDoc(options: Options): object;

  export default swaggerJSDoc;
}

