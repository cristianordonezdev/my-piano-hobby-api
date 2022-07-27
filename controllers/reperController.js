'use strinct'
var validator = require('validator');
var reperModel = require('../models/reper');

var reperController = {

    test : (req,res)=>{
        return res.status(200).send({
            message :'Testing my routes and controller'
        });
    },

    save: (req,res)=>{
        var params = req.body;
        if(!validator.isEmpty(params.title) && !validator.isEmpty(params.author)) {
            var newReper = new reperModel();
            newReper.title = params.title;
            newReper.author = params.author;
            if(validator.isEmpty(params.link)){
                newReper.link = null;
            }else{
                newReper.link = params.link;
            }
            console.log(params);
            newReper.save((err,reperSaved)=>{
                if(err && !reperSaved){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Hubo un error al tratar de guardar la nueva cancón'
                    });
                }
                return res.status(200).send({
                    status :"ok",
                    reperSaved
                });
            });

       
        }else{
            return res.status(200).send({
                status:'error',
                message: 'No ingreses valores vacios'
            });
        }

    },

    getAll: (req,res)=>{

        var num = req.params.value;
        if(num){
            var rep=reperModel.find({}).limit(3);
        }else{
            var rep=reperModel.find({})
        }

        
        rep.sort('-_id').exec((err, repers)=>{

            if(err && !repers){
                return res.status(500).send({
                    status: 'error',
                    message: 'Hubo un error al tratar de devolver el repertorio'
                });
            }

            return res.status(200).send({
                status: 'ok',
                repers
            });
        });

    },

    getOne : (req,res)=>{
        var id = req.params.id;

        reperModel.findById(id,(error,reper)=>{
            if(error && !reper){
                return res.status(500).send({
                    status: 'error',
                    message: 'No existe el repertorio con esa ID'
                });
            }
               
            return res.status(200).send({
                status:'ok',
                reper
            })
        });
    },

    update: (req,res)=>{
        var id = req.params.id;
        var params = req.body;

        if(!validator.isEmpty(params.title) && !validator.isEmpty(params.author)){
            reperModel.findByIdAndUpdate(id,params , {new:true},(err,updated)=>{
                if(err && !updated){
                    return res.status(500).send({
                        status:'error',
                        message:'Hubo un error al tratar de actualziar'
                    });
                }

                return res.status(200).send({
                    status:'ok',
                    updated
                })
            });

        }else{
            return res.status(500).send({
                status: 'error',
                message: 'Las validaciones son incorrectas'
            })
        }


    },

    delete: (req,res)=>{
        var id = req.params.id;

        reperModel.findByIdAndRemove(id,(err,removed)=>{
            if(err && !removed){
                return res.status(500).send({
                    status:'error',
                    message : 'Hubo un error al tratar de eliminar el repertorio'
                });
            }

            return res.status(200).send({
                status:'ok',
                removed
            })
        });
    },

    search: (req,res)=>{
        var toSearch = req.params.id;
        reperModel.find({
            "$or":[
                {"title":{"$regex":toSearch, "$options":"i"}},
                {"author":{"$regex":toSearch, "$options":"i"}}

            ]
        })
        .sort([['start','descending']])
        .exec((err,searched)=>{

            if(err && !searched){ 
                return res.status(500).send({
                    status:"error",
                    message : "Hubo un error al tratar de buscar eso"
                });
            }

            return res.status(200).send({
                status:"ok",
                searched
            });
        });
    }
}

module.exports = reperController;