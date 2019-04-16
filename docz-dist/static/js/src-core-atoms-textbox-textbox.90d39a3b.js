(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"./node_modules/css-loader/dist/cjs.js!./src/core/atoms/Textbox/Textbox.css":function(e,t,n){(e.exports=n("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([e.i,".textbox-component {\n  position: relative;\n  display: inline-block;\n  width: 100%\n}\n\n.textbox-component > input {\n  min-height: 40px;\n  font-size: 14px;\n  padding: 5px 20px 5px 10px;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.textbox-component > input::-ms-clear,\n.textbox-component > input::-ms-reveal {\n  display: none;\n}\n\n.textbox-component .clear {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  color: #282c34;\n  margin-right: 5px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n\n.textbox-component .clear > .clear__icon {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: solid 1px;\n  border-radius: 50%;\n  height: 14px;\n  width: 14px;\n  padding: 0 0 2px 1px;\n}\n",""])},"./src/core/atoms/Textbox/Textbox.css":function(e,t,n){var o=n("./node_modules/css-loader/dist/cjs.js!./src/core/atoms/Textbox/Textbox.css");"string"===typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0},a=n("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals),e.hot.accept("./node_modules/css-loader/dist/cjs.js!./src/core/atoms/Textbox/Textbox.css",function(){var t=n("./node_modules/css-loader/dist/cjs.js!./src/core/atoms/Textbox/Textbox.css");if("string"===typeof t&&(t=[[e.i,t,""]]),!function(e,t){var n,o=0;for(n in e){if(!t||e[n]!==t[n])return!1;o++}for(n in t)o--;return 0===o}(o.locals,t.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");a(t)}),e.hot.dispose(function(){a()})},"./src/core/atoms/Textbox/Textbox.js":function(e,t,n){"use strict";var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/clsx/dist/clsx.m.js");n("./src/core/atoms/Textbox/Textbox.css");function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var l,s=e[Symbol.iterator]();!(o=(l=s.next()).done)&&(n.push(l.value),!t||n.length!==t);o=!0);}catch(i){r=!0,a=i}finally{try{o||null==s.return||s.return()}finally{if(r)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function i(e){var t=e.classname,n=e.children,i=e.readOnly,c=e.value,u=e.handleChange,d=e.handleClearValue,p=e.type,A=e.ariaLabel,m=e.isRequired,f=e.canClear,b=e.placeHolder,g=s(e,["classname","children","readOnly","value","handleChange","handleClearValue","type","ariaLabel","isRequired","canClear","placeHolder"]),h=l(Object(o.useState)(c),2),x=h[0],y=h[1];Object(o.useEffect)(function(){x!==c&&(console.log("text",c),y(c))},[c]);var w=Object(o.useRef)(null),B=function(){y(""),d(),w.current.focus()};return r.a.createElement("div",{className:Object(a.a)(t,"textbox-component",{disabled:i})},r.a.createElement("input",Object.assign({type:p,value:x,onChange:function(e){y(e.target.value),u(e)},readOnly:i,"aria-label":A,required:m,"aria-required":m,placeholder:b,"data-testid":"textbox",ref:w,className:Object(a.a)({disabled:i})},g)),f&&!i&&x.length>0&&r.a.createElement("div",{className:"clear",role:"button",tabIndex:"0","aria-pressed":"false","aria-label":"clear-textbox",onClick:B,onKeyPress:function(e){"Enter"===e.key&&B()},"data-testid":"clear-textbox"},r.a.createElement("span",{className:"clear__icon"},"\xd7")),n)}i.defaultProps={children:null,handleChange:function(){},handleClearValue:function(){},readOnly:!1,classname:"",value:"",type:"text",ariaLabel:"textbox",isRequired:!1,canClear:!0,placeHolder:""},t.a=i,i.__docgenInfo={description:"",methods:[],displayName:"Textbox",props:{children:{defaultValue:{value:"null",computed:!1},type:{name:"node"},required:!1,description:""},handleChange:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},handleClearValue:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},readOnly:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},classname:{defaultValue:{value:"''",computed:!1},type:{name:"string"},required:!1,description:""},value:{defaultValue:{value:"''",computed:!1},type:{name:"string"},required:!1,description:""},type:{defaultValue:{value:"'text'",computed:!1},type:{name:"enum",value:[{value:"'text'",computed:!1},{value:"'email'",computed:!1},{value:"'password'",computed:!1}]},required:!1,description:""},ariaLabel:{defaultValue:{value:"'textbox'",computed:!1},type:{name:"string"},required:!1,description:""},isRequired:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},canClear:{defaultValue:{value:"true",computed:!1},type:{name:"bool"},required:!1,description:""},placeHolder:{defaultValue:{value:"''",computed:!1},type:{name:"string"},required:!1,description:""}}}},"./src/core/atoms/Textbox/Textbox.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return m});var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/@mdx-js/tag/dist/index.js"),l=n("./node_modules/docz/dist/index.m.js"),s=n("./src/core/atoms/Textbox/Textbox.js");function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,t){return!t||"object"!==i(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t){return(A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=d(this,p(t).call(this,e))).layout=null,n}var n,o,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&A(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){var e=this.props,t=e.components,n=c(e,["components"]);return r.a.createElement(a.MDXTag,{name:"wrapper",components:t},r.a.createElement(a.MDXTag,{name:"h1",components:t,props:{id:"textbox"}},"TextBox"),r.a.createElement(l.e,{__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkqiUrGiJkjK8Eq1QyZnWTWWoXY2Hm_To5G67mScAIAlCKRSsDsIxeeHGNjsFU83iWM1g_m6mVsSPMtjgoRg62oqTxb3qiAAlGYjJIzBAiDNKAIpgAlGCuchTMBCIjsToSqXtADc_MFwrFioIABEAPIAWXYMsi8q6koIAFoTkQVWqhSKHJEhah9EbZfKcJJsK5BbBbagzOLzXr9TguhgMgAKdbMNhidYWRh4ADMYkc6pdNE46pF2XYuImPScwJJNQEiCkKfj5gs7EYMzEkYaUyiyRdedc6BYMWo8XYMyEd3GlFSMCmL3Y4cw_VQKXzMASnKkDYTdfTztdkmriekccUZhOvSI-hwaQIAFFYMeaAAhRINdCRzrCAjtbmoTnKhTKb2-mA4TQyB0ahaHoRAVBzKZLGwAhqjdE12k9OABHIQFhRgSRokiOBJGgrBYO8XCYOqf0BXtTVzXguUFXNdo7Q1dhgHYTQfHkKj5QAARgIgRAGVA0K6OiA1QXRUWOU4AC9nAIRJsXYbhGPWKIBGeVArnaAAGdhkxmLB2n3GsZk7FhZ3UgAWXT2AANl0_T1jAECADEfWgRJ1P4ZxDkRR1MHYAAFIR-CWHifjgIzETsmsHJoZwIAky52AARjMgz5HBETqDEgBBOZ5PYSMmPIGwoHQcN2HkTl5LEfKYxkdhUVkmBuGAQ8pJk7F5G3WtgCK6BSuCAAyAbxkSeZKGaXqSrK7gZvlMBQhEntUHadgAH4Nj68NI0qq5Jv61A0prKQZGrd8zFhBjMDAMIoCmbaqpqo6cpXGsLGAe7uGq4BVwsWAplofCADV4kZPL2k2BJKCE2tay6Ag-nMaNXphus8IIrAfpR1gQaa4AAYIYGoEZQ6UZRvwMFgexybSZruk-otUDgShYBwKBKBSSN_wIVwVLHHBsaJmBORJ0n2C3TH3xh-QRakZ7TrMb8QGQ1CqC6TCIiIHC0eqIj8OqACtAoED9AYMiGKDKUliYvIYGkrIlht8UwAduAYHPMAwC2KY2ONaizSVVVUDNh1yCgOAfF9-VQ_D0jIMUmsfkwAyLFRGcUmT9gvGZjP5pEjPqBgXVnbMH33XaAdKBmC0ZPmOBY_Ij1dfRj44DrwOzFzqU-KsYjvAK9ZQ_8OBUB9GAM728MM7NdBdVQJIM4FxkM_J9BKepsf1hXymKQEQml_WGuN5rHmIFcAAZVxAigDPbHFABHUIIC6RYB_cewd4z8lJRgAAJZnpwzjgIBFc7gl0qt9GsokpgAG18Z7zHvVMcaN4EAF08o2ztrQSMi8haBwsDbd2nspSRg-l9VcEBmiRjgTjdgABCWaODwGY1Eszf8bMObtHxvpdgjC8Eo1dgQZBONsE40_KuEWSh2DQJwSgsRwkLBQPGDBBoqAZjhHQa7J2kZUChEXO3SBmUpihBmOgLIQjBZ5U5pVemECYYCPMYyTmOBua8wIPzURfCLBbxgFTdwaQrF8PkHwxRocJQCEchABcOQFKkPjnYpBMF4FPjfJ46YFMfE7ySXImG-MVFqLcb0AQ4Y3EOV6HAbagT9EWDhgjR6MNYwcEHq3AAcqPZq0csCRiacPUeSxOG9ywBaT4G4aDcKYiwCoHhYDoCuNPWeSRyrCy6vUtA-TMYWEPs1Q-ItSY4K2YknGOyUbUF8bOXGxjTG0AcTAI5MM5lz0SM1e5SRbm1hPq4C0UBL4Lmau8i-V9XnVJgA_J-2Rmq32BY_Z-gKQj9A-V0EFz9wVwHvlC7IMKv6ImGCVDIzVMW_3_hkGFlyPm0FRFwPgIB8bVH4OsycMAwD7Pwnk8IMLumtOPO0sOnTxm2EvtM2ZEoZ4PMWTC4AQCcAgLgK88WyM3qrFQO_MJdKhp0OeYkFVw1qGC1ZnQFIhZqoaU1XU0WiYZB0phuytp_BQk81pXK0WQhYCUo8OECIAYQAWtrNzDwKi1CUqNZ6h1pN3kWgHPAV2PB-DXTDkyINpqYahq-VfSltqBDVwGfahNtYTlQFiNsLlYSIlRJhTDagABpGAiQAoRualYh6TEKH5X_NsKt8lZrtHPHoAQb5GI9B3sWkqATyrlVLbWElGbyVRp0DvDNetvBZoTcshNjAwruH7UPDlTUbU7wAPq7tiNQcQA0YjHjgMqKQa7UDLtJsdOMdLJai1eT1Yq-0jl3tkOsORh0zDa28JKwclhRrwDyrYjaU06BXETkfLxlQ15-ISp3ZecGMlhPgVcJD6x1VXCztfAeXzW4j2PFcVOBQF44xI2iMjB9gNXALkXSM0D-n4W4e0birhoCsaMq3EYwp0DtFkRnP53yoCUbTjfFFkLQUzMzsIPDkC347xw3Jz-XzER_xxeWeqVHZypX0X-3AV0boEACpXOwCkwMT0g-wHRCRkPpNOWkK4sTgBKE3ihpVPN0P5WsV9NzNZsNGniK7ceBGenEflJFCwOD1JRZGvMdSXChNwv-QuRLAy4sQsRdkDDwWYMKs81ptE-9DJqYJZp2Len0oXQdEZ3RUEBmB0VsrASGEsKaybjrAzLdDbAT0GBEAziBlDKdAXLMYGhT5CWoKr5MRWAwD4RMr-blOBzzQDAC0UzTjbD4bidAEwriJQ0hpAApCXdKQ352DOGWNqY1VVnqLA0QNAFpNgQBSIQK4ZkNK6T4dFS0-R4qHYslgPhRkuwFCuAAVksgAJh-z4GHPgju_fWHtg7SVjsnb4dUC0gPIeyYENOTb3hA4_tQJd9GI2Myunu6o8IiBEAWk1kMj-ZhKe45u5mO7q38mM-Z3AC0XR5t9jA0tr5K2fgujJxd6l3hqcjKmB8HecT-yUCm3xK4l8mZE1oHwiIMwrgaRxyIDWRu-H9A-wQc3A9mbCiuAAYlhwADlh-QZMZk-HKVUkL97n32BI-CX0JmWmhRoFoAIRbthlsYdgKD9Y8R3uoAtC8bi9wej6AyDL4SHP5dc9dMrsJ7BqqF55vuw95gxfR4l7H7AfD1B5BiGARII3-vW4z92vhieUjJ9T5rXamfI_rC8ETjIJHmZcCSqjmsI_ieZBYHkaHp2-Fvat8D6fFh0d4HX_HwyxkCdaS0rDyyiVp-HUVuFbYrg0gG2oEBXQoEDDgTA_wIjcarg2uLMSKo3gMgWl_OSHGhnPwPNgIPkEekgOwPwBpDgDAYGsASAOUOQP0DMEtPwB_iAFlPVGRLADCFgD6IAccDAOSJQIkHmHkAUPSuaCNuUCCL_gIEFOsPwFEGgOgVASoBGBoHAIwTWPwJgPMBGCJJEtwZAWBhYPwP7KIJAfwAAHqJRWQ4DO44BmQ8Eww7rhxsGyGJSwE4DJiqG1j8AgLVzAYiEYFyFQ44AADsOAsO-h4hggWoVokQmhIAchChShKh8a5UJczWdBuAugkAKQt-qA9-xsA230VK3EX8tA6BNqZotAQujhswMw_A8gCg0sQAA",__position:0,__code:"() => {\n  let textValue = 'hello'\n  return (\n    <Textbox\n      value={textValue}\n      handleChange={e => console.log(e.target.value)}\n    />\n  )\n}",__scope:{props:this?this.props:n,Textbox:s.a}},function(){return r.a.createElement(s.a,{value:"hello",handleChange:function(e){return console.log(e.target.value)}})}),r.a.createElement(l.f,{of:s.a}))}}])&&u(n.prototype,o),i&&u(n,i),t}();m.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}}}]);
//# sourceMappingURL=src-core-atoms-textbox-textbox.a50d04675ac69a1ad919.js.map