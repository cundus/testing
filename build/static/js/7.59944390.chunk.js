(this["webpackJsonpaxiata-portal"]=this["webpackJsonpaxiata-portal"]||[]).push([[7],{300:function(e,t,a){"use strict";var n=a(46),r=a(41),i=a(42),l=a(44),c=a(43),o=a(45),d=a(304),u=a(0),s=a.n(u),p=a(463),b=a(460),h=a(462),f=a(458),y=a(128);function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var O=p.a.TextArea,j=s.a.createContext(),v=b.a.create()((function(e){var t=e.form,a=(e.index,Object(d.a)(e,["form","index"]));return s.a.createElement(j.Provider,{value:t},s.a.createElement("tr",a))})),k=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).change=function(e){var t=a.props,n=t.record,r=t.handleChange;a.form.validateFields((function(e,t){r(m({},n,{},t))}))},a.renderCell=function(e){a.form=e;var t=a.props,n=t.editable,r=t.dataIndex,i=t.record,l=t.placeholder,c=t.type,o=t.title;return s.a.createElement(b.a.Item,{style:{margin:0}},e.getFieldDecorator(r,{rules:[{required:!0,message:"".concat(o," is required")}],initialValue:i[r]})("number"===c?s.a.createElement(h.a,{id:o,className:"input",ref:function(e){return a.input=e},placeholder:l,type:c,onChange:a.change,disabled:!n}):s.a.createElement(O,{id:o,className:"input",ref:function(e){return a.input=e},placeholder:l,autoSize:{minRows:3,maxRows:5},onChange:a.change,disabled:!n})))},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.editable,e.dataIndex,e.title,e.record,e.index,e.handleChange,e.children),a=e.action,n=Object(d.a)(e,["editable","dataIndex","title","record","index","handleChange","children","action"]);return s.a.createElement("td",n,a?t:s.a.createElement(j.Consumer,null,this.renderCell))}}]),t}(s.a.Component);t.a=function(e){var t=e.dataSource,a=e.handleChange,n=e.columns,r=Object(y.useMediaQuery)({minDeviceWidth:1224}),i={body:{row:v,cell:k}},l=n.map((function(e){return m({},e,{onCell:function(t){return{record:t,editable:e.editable,dataIndex:e.dataIndex,title:e.title,type:e.type,action:e.action,placeholder:e.placeholder,handleChange:a}}})}));return s.a.createElement("div",null,s.a.createElement(f.a,{components:i,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t,columns:l,scroll:r?{x:!1}:{x:!0},pagination:!1,style:{marginBottom:10}}))}},302:function(e,t,a){"use strict";var n=a(300);a.d(t,"a",(function(){return n.a}));a(31)},303:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",(function(){return n}))},466:function(e,t,a){"use strict";a.r(t);var n=a(41),r=a(42),i=a(44),l=a(43),c=a(45),o=a(0),d=a.n(o),u=a(46),s=a(303),p=a(302);function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var h=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).getAllData=function(){a.setState({dataSource:[{key:1,typeKpi:"Cascading from Superior",kpi:"Create datawarehouse for HC Analytics purposes",baseline:"Ready in Q3 2019",weight:20,l1:"Ready in Q2 2019",l2:"Ready in Q3 2019",l3:"Ready in Q4 2019",feedback:"Make L2 ready in Q2 2019 and adjust other level. Rating stays."},{key:2,typeKpi:"Cascading from Superior",kpi:"Create datawarehouse for HC Analytics purposes",baseline:"Ready in Q3 2019",weight:20,l1:"Ready in Q2 2019",l2:"Ready in Q3 2019",l3:"Ready in Q4 2019",feedback:"Make L2 ready in Q2 2019 and adjust other level. Rating stays."},{key:3,typeKpi:"Cascading from Superior",kpi:"Create datawarehouse for HC Analytics purposes",baseline:"Ready in Q3 2019",weight:20,l1:"Ready in Q2 2019",l2:"Ready in Q3 2019",l3:"Ready in Q4 2019",feedback:"Make L2 ready in Q2 2019 and adjust other level. Rating stays."},{key:4,baseline:"Total Ratting",weight:"100%"}]})},a.handleDelete=function(e){var t=Object(s.a)(a.state.dataSource);a.setState({dataSource:t.filter((function(t){return t.key!==e}))})},a.handleAdd=function(){var e=a.state,t=e.count,n=e.dataSource,r={key:t,typeKpi:"",kpi:"",baseline:"",weight:"",l1:"",l2:"",l3:""};a.setState({dataSource:[].concat(Object(s.a)(n),[r]),count:t+1})},a.handleChange=function(e){var t=Object(s.a)(a.state.dataSource),n=t.findIndex((function(t){return e.key===t.key})),r=t[n];t.splice(n,1,function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(a,!0).forEach((function(t){Object(u.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},r,{},e)),a.setState({dataSource:t})},a.columns=[{title:"Cascading/ Self KPI",dataIndex:"typeKpi",placeholder:"Cascading/Self KPI"},{title:"KPI Subject",dataIndex:"kpi",placeholder:"Enter 2020 baseline",editable:!0},{title:"2019 Baseline",dataIndex:"baseline",placeholder:"Enter 2019 baseline",editable:!0},{title:"Weight (100%)",dataIndex:"weight",placeholder:"Enter KPI Weight",type:"number",editable:!0},{title:"L1",dataIndex:"l1",placeholder:"Enter Level 1",editable:!0},{title:"L2",dataIndex:"l2",placeholder:"Enter Level 2",editable:!0},{title:"L3",dataIndex:"l3",placeholder:"Enter Level 3",editable:!0},{title:"Feedback",dataIndex:"feedback",placeholder:"Feedback"}],a.state={dataSource:[{key:0,typeKpi:"",kpi:"",baseline:"",weight:"",l1:"",l2:"",l3:""}],count:1},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getAllData()}},{key:"render",value:function(){var e=this.state.dataSource,t=this.columns,a=this.handleAdd,n=this.handleChange,r=this.handleDelete;return d.a.createElement("div",null,d.a.createElement(p.a,{columns:t,dataSource:e,handleAdd:a,handleChange:n,handleDelete:r}))}}]),t}(o.Component),f=a(72),y=a(28),g=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement(h,null),d.a.createElement(y.b,{to:"/planning/kpi-planning/"},d.a.createElement(f.a,{type:"default"},"Submit To Superior")))}}]),t}(o.Component);t.default=g}}]);
//# sourceMappingURL=7.59944390.chunk.js.map