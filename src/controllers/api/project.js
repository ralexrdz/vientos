var ProjectManager = require('./../../managers/project');

function ProjectController() { };
ProjectController.prototype = (function () {
    return {
        login: function login(request,reply){
            ProjectManager.find(
                request.mongo.db, 
                {email: request.payload.email}, 
                {password: 1}, 
                function(res){
                    console.log(res);
                    reply("login");
                    var account = {
                        id: request.payload.id,
                        password: request.payload.password,
                        name: request.payload.name
                    };
                    request.auth.session.set(account);
                }
            );            
            reply("login");
        },
        findAll: function findAll(request, reply) {
            var db = request.mongo.db;  
            ProjectManager.findAll(db, function (res) {
                reply(res);
            });
        },
        findAutogestival: function findAutogestival(request, reply) {
            var db = request.mongo.db;  
            ProjectManager.findAutogestival(db, function (res) {
                reply(res);
            });
        },
        findById: function findById(request, reply) {
            var db = request.mongo.db ;  
            var objID = request.mongo.ObjectID;
            ProjectManager.findByCategoryId(db, new objID(request.params.project_id), function (res) {
                reply(res);
            });
        },
        findByCategoryId: function findByCategoryId(request, reply) {
            var db = request.mongo.db;  
            var objID = request.mongo.ObjectID;
            ProjectManager.findByCategoryId(db, new objID(request.params.category_id), function (res) {
                console.log(res);
                reply(res);
            });
        },
        findByKeyWords: function findByKeyWords(request, reply) {
            var db = request.mongo.db;  
            ProjectManager.findByKeyWords(db, request.params.keywords, function (res) {
                reply(res);
            });
        },
        shortRegister: function shortRegister(request, reply){
            var newProject = {
                email: request.payload.email,
                password: request.payload.password,
                name: request.payload.name
            }
            ProjectManager.insert(db, newProject, function (res) {
                reply(res);
            });
        },
        register: function register(request, reply) {
            var db = request.mongo.db;
            var objID = request.mongo.ObjectID;
            console.log(request.payload.categories_ids.length);
            console.log(request.payload.categories_ids);
            var categories_objids = [];
            if(typeof stringValue=="string"){
                categories_objids[0] = new objID(request.payload.categories_ids);
            }
            else{
                for (var i = 0; i < request.payload.categories_ids.length; i++) {
                    categories_objids[i]=(new objID(request.payload.categories_ids[i]));
                };
            }
            console.log(categories_objids);
            var newProject = {  
                email: request.payload.email,
                password: require('bcrypt').hashSync(request.payload.password, 10),
                name: request.payload.name,
                description: request.payload.description,
                categories_ids: categories_objids,
                address: request.payload.address,
                latitutde: request.payload.latitutde,
                longitude: request.payload.longitude,
                webpage: request.payload.webpage,
                facebook: request.payload.facebook
            };  
            ProjectManager.insert(db, newProject, function (res) {
                reply(res);
            });
        },
        update: function update(request, reply) {
            var db = request.mongo.db;  
            if(request.payload.parent){
                console.log(request.payload.parent);
            }
            else{
                console.log("no parent");
            }
            ProjectManager.update(db, updatedProject, function (res) {
                reply(res);
            });
        },
        delete: function (request, reply) {
            var db = request.mongo.db;  
            ProjectManager.delete(db, request.params.id, function (res) {
                reply(res);
            });
        }
    }
})();
var ProjectController = new ProjectController();
module.exports = ProjectController;