(this["webpackJsonpaxiata-portal"]=this["webpackJsonpaxiata-portal"]||[]).push([[8],{298:function(e,t,a){"use strict";var n=a(78),r=a(39),i=a(40),c=a(42),l=a(41),o=a(43),d=a(303),u=a(0),s=a.n(u),p=a(463),h=a(459),f=a(460),y=a(457),b=(a(178),a(301),a(125));function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var O=p.a.TextArea,j=s.a.createContext(),v=h.a.create()((function(e){var t=e.form,a=(e.index,Object(d.a)(e,["form","index"]));return s.a.createElement(j.Provider,{value:t},s.a.createElement("tr",a))})),k=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).change=function(e){var t=a.props,n=t.record,r=t.handleChange;a.form.validateFields((function(e,t){r(m({},n,{},t))}))},a.renderCell=function(e){a.form=e;var t=a.props,n=t.editable,r=t.dataIndex,i=t.record,c=t.placeholder,l=t.type,o=t.title;return s.a.createElement(h.a.Item,{style:{margin:0}},e.getFieldDecorator(r,{rules:[{required:!0,message:"".concat(o," is required")}],initialValue:i[r]})("number"===l?s.a.createElement(f.a,{id:o,className:"input",ref:function(e){return a.input=e},placeholder:c,type:l,onChange:a.change,disabled:!n}):s.a.createElement(O,{id:o,className:"input",ref:function(e){return a.input=e},placeholder:c,autoSize:{minRows:3,maxRows:5},onChange:a.change,disabled:!n})))},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.editable,e.dataIndex,e.title,e.record,e.index,e.handleChange,e.children),a=e.action,n=Object(d.a)(e,["editable","dataIndex","title","record","index","handleChange","children","action"]);return s.a.createElement("td",n,a?t:s.a.createElement(j.Consumer,null,this.renderCell))}}]),t}(s.a.Component);t.a=function(e){var t=e.dataSource,a=e.handleChange,n=e.columns,r=Object(b.useMediaQuery)({minDeviceWidth:1224}),i={body:{row:v,cell:k}},c=n.map((function(e){return m({},e,{onCell:function(t){return{record:t,editable:e.editable,dataIndex:e.dataIndex,title:e.title,type:e.type,action:e.action,placeholder:e.placeholder,handleChange:a}}})}));return s.a.createElement("div",null,s.a.createElement(y.a,{components:i,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t,columns:c,scroll:r?{x:!1}:{x:!0},pagination:!1,style:{marginBottom:10}}))}},300:function(e,t,a){"use strict";var n=a(298);a.d(t,"a",(function(){return n.a}));a(28)},301:function(e,t,a){},302:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",(function(){return n}))},465:function(e,t,a){"use strict";a.r(t);var n=a(39),r=a(40),i=a(42),c=a(41),l=a(43),o=a(0),d=a.n(o),u=a(78),s=a(302),p=a(300);function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var f=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).getAllData=function(){a.setState({dataSource:[{key:1,typeKpi:"Cascading from Superior",kpi:"Create datawarehouse for HC Analytics purposes",baseline:"Ready in Q3 2019",weight:20,l1:"Ready in Q2 2019",l2:"Ready in Q3 2019",l3:"Ready in Q4 2019",feedback:"Make L2 ready in Q2 2019 and adjust other level. Rating stays."},{key:2,typeKpi:"Cascading from Superior",kpi:"Create datawarehouse for HC Analytics purposes",baseline:"Ready in Q3 2019",weight:20,l1:"Ready in Q2 2019",l2:"Ready in Q3 2019",l3:"Ready in Q4 2019",feedback:"Make L2 ready in Q2 2019 and adjust other level. Rating stays."},{key:3,typeKpi:"Cascading from Superior",kpi:"Create datawarehouse for HC Analytics purposes",baseline:"Ready in Q3 2019",weight:20,l1:"Ready in Q2 2019",l2:"Ready in Q3 2019",l3:"Ready in Q4 2019",feedback:"Make L2 ready in Q2 2019 and adjust other level. Rating stays."},{key:4,baseline:"Total Ratting",weight:"100%"}]})},a.handleDelete=function(e){var t=Object(s.a)(a.state.dataSource);a.setState({dataSource:t.filter((function(t){return t.key!==e}))})},a.handleAdd=function(){var e=a.state,t=e.count,n=e.dataSource,r={key:t,typeKpi:"",kpi:"",baseline:"",weight:"",l1:"",l2:"",l3:""};a.setState({dataSource:[].concat(Object(s.a)(n),[r]),count:t+1})},a.handleChange=function(e){var t=Object(s.a)(a.state.dataSource),n=t.findIndex((function(t){return e.key===t.key})),r=t[n];t.splice(n,1,function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(a,!0).forEach((function(t){Object(u.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},r,{},e)),a.setState({dataSource:t})},a.columns=[{title:"Cascading/ Self KPI",dataIndex:"typeKpi",placeholder:"Cascading/Self KPI"},{title:"KPI Subject",dataIndex:"kpi",placeholder:"Enter 2020 baseline"},{title:"2019 Baseline",dataIndex:"baseline",placeholder:"Enter 2019 baseline"},{title:"Weight (100%)",dataIndex:"weight",placeholder:"Enter KPI Weight",type:"number"},{title:"L1",dataIndex:"l1",placeholder:"Enter Level 1"},{title:"L2",dataIndex:"l2",placeholder:"Enter Level 2"},{title:"L3",dataIndex:"l3",placeholder:"Enter Level 3"},{title:"Feedback",dataIndex:"feedback",placeholder:"Feedback"}],a.state={dataSource:[{key:0,typeKpi:"",kpi:"",baseline:"",weight:"",l1:"",l2:"",l3:""}],count:1},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getAllData()}},{key:"render",value:function(){var e=this.state.dataSource,t=this.columns,a=this.handleAdd,n=this.handleChange,r=this.handleDelete;return d.a.createElement("div",null,d.a.createElement(p.a,{columns:t,dataSource:e,handleAdd:a,handleChange:n,handleDelete:r}))}}]),t}(o.Component),y=a(70),b=a(25),g=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement(f,null),d.a.createElement(b.b,{to:"/planning/kpi-planning/edit"},d.a.createElement(y.a,{type:"primary"},"Edit My KPI")))}}]),t}(o.Component);t.default=g}}]);
//# sourceMappingURL=8.c2f4b340.chunk.js.map