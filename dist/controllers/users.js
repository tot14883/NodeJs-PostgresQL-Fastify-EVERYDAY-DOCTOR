"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__awaiter=this&&this.__awaiter||function(e,o,i,u){return new(i=i||Promise)(function(r,t){function n(e){try{s(u.next(e))}catch(e){t(e)}}function a(e){try{s(u.throw(e))}catch(e){t(e)}}function s(e){var t;e.done?r(e.value):((t=e.value)instanceof i?t:new i(function(e){e(t)})).then(n,a)}s((u=u.apply(e,o||[])).next())})},__generator=this&&this.__generator||function(r,n){var a,s,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(a)throw new TypeError("Generator is already executing.");for(;i;)try{if(a=1,s&&(o=2&t[0]?s.return:t[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,t[1])).done)return o;switch(s=0,o&&(t=[2&t[0],o.value]),t[0]){case 0:case 1:o=t;break;case 4:return i.label++,{value:t[1],done:!1};case 5:i.label++,s=t[1],t=[0];continue;case 7:t=i.ops.pop(),i.trys.pop();continue;default:if(!(o=0<(o=i.trys).length&&o[o.length-1])&&(6===t[0]||2===t[0])){i=0;continue}if(3===t[0]&&(!o||t[1]>o[0]&&t[1]<o[3])){i.label=t[1];break}if(6===t[0]&&i.label<o[1]){i.label=o[1],o=t;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(t);break}o[2]&&i.ops.pop(),i.trys.pop();continue}t=n.call(r,i)}catch(e){t=[6,e],s=0}finally{a=o=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}};Object.defineProperty(exports,"__esModule",{value:!0});var crypto=__importStar(require("crypto")),user_1=require("../model/user");function users(r){return __awaiter(this,void 0,void 0,function(){var u,c,t=this;return __generator(this,function(e){return u=new user_1.UserModel,c=r.db,r.post("/",{preValidation:[r.authenticate]},function(o,i){return __awaiter(t,void 0,void 0,function(){var t,r,n,a,s;return __generator(this,function(e){switch(e.label){case 0:n=o.body,t=n.username,a=n.password,r=n.firstName,n=n.lastName,e.label=1;case 1:return e.trys.push([1,3,,4]),a=crypto.createHash("md5").update(a).digest("hex"),(s={}).username=t,s.password=a,s.first_name=r,s.last_name=n,[4,u.create(c,s)];case 2:return e.sent(),i.send({ok:!0}),[3,4];case 3:return s=e.sent(),console.log(s),i.code(500).send({ok:!1,message:s.message}),[3,4];case 4:return[2]}})})}),r.get("/",{preValidation:[r.authenticate]},function(e,r){return __awaiter(t,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,u.read(c)];case 1:return t=e.sent(),r.send(t),[3,3];case 2:return t=e.sent(),console.log(t),r.code(500).send({ok:!1,error:t.message}),[3,3];case 3:return[2]}})})}),r.get("/search",{preValidation:[r.authenticate]},function(n,a){return __awaiter(t,void 0,void 0,function(){var t,r;return __generator(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),t=n.query,t=t.q,[4,u.search(c,t)];case 1:return r=e.sent(),a.send(r),[3,3];case 2:return r=e.sent(),console.log(r),a.code(500).send({ok:!1,error:r.message}),[3,3];case 3:return[2]}})})}),r.put("/:userId/edit",{preValidation:[r.authenticate]},function(o,i){return __awaiter(t,void 0,void 0,function(){var t,r,n,a,s;return __generator(this,function(e){switch(e.label){case 0:n=o.body,a=n.password,t=n.firstName,r=n.lastName,n=o.params,n=n.userId,e.label=1;case 1:return e.trys.push([1,3,,4]),(s={}).first_name=t,s.last_name=r,a&&(a=crypto.createHash("md5").update(a).digest("hex"),s.password=a),[4,u.update(c,n,s)];case 2:return e.sent(),i.send({ok:!0}),[3,4];case 3:return s=e.sent(),console.log(s),i.code(500).send({ok:!1,message:s.message}),[3,4];case 4:return[2]}})})}),r.delete("/:userId",{preValidation:[r.authenticate]},function(r,n){return __awaiter(t,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),t=r.params,t=t.userId,[4,u.remove(c,t)];case 1:return e.sent(),n.send({ok:!0}),[3,3];case 2:return t=e.sent(),console.log(t),n.code(500).send({ok:!1,error:t.message}),[3,3];case 3:return[2]}})})}),[2]})})}exports.default=users;