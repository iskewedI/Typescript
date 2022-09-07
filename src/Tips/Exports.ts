// ES6 Module Formats
// import { X as Y } from "./x.ts" -> Change the class imported name.

/* CommonJS format =>
    exports.x = () => {}

    require("./someFile")

*/

/* Re-Exporting -> Combining the import of different modules in a single exported module
 We can create a folder to hold similar components, and create a index.ts file to import and re-export them
 Then, to import all at once in one line, we can call
 import { Module1, Module2 } from "./folder/index.ts" -> We can reduce it even further
 import { Module1, Module2 } from "./folder" -> We need to set "moduleResolution" to "node" to be able to do this.
 And lastly we can even remove the export { Module1, Module2 } from the index.ts and only change the 'import' keyword to 'export'

 index.ts ->
 export { Module1 } from "./Module1";
 export { Module2 } from "./Module2";
 */
