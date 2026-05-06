export const JWT_SECRET = "123:456"   //Just for testing, usually this should be in env variable and not hard coded


// module.exports ={
//     JWT_SECRET
// }


//we can simply use export default in typescript but since we are using nodejs module system, we have to use module.exports to export the config object.


//If we want to use previous syntax then:
//{
//  "module": "commonjs",     (use old version of js)
//  "esModuleInterop": true,  (allow older import)
//  "verbatimModuleSyntax": false    (don't be strict about module syntax)
//}