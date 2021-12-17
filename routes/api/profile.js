const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User=require('../../models/Users')
const Profile=require('../../models/Profile')
const {check,validationResult}=require('express-validator')

router.get('/me',auth, async(req,res) =>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);

        if(!profile){
            return res.status(400).json({masg:'There is no profile for this user'});

        }

        res.json(profile)


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

//create profile
router.post('/',[ auth,[check('status','status is required').not().isEmpty(), check('skills','skills is required').not().isEmpty()]],async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        instagram,
        linkedin
    }=req.body

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company)profileFields.company=company;
    if(website)profileFields.website=website;
    if(location)profileFields.location=location;
    if(bio)profileFields.bio=bio;
    if(status)profileFields.status=status;
    if(githubusername)profileFields.githubusername=githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());

    }

    profileFields.social={}
        if(youtube) profileFields.social.youtube=youtube;
        if(twitter) profileFields.social.twitter=twitter;
        if(facebook) profileFields.social.facebook=facebook;
        if(instagram) profileFields.social.youtube=instagram;
        if(linkedin) profileFields.social.youtube=linkedin;   

    try{
        let profile =await Profile.findOne({user: req.user.id});
        if(profile){

            profile = await Profile.findOneAndUpdate({user: req.user.id},{$set: profileFields},{new:true});
            return res.json(profile);
        } 

            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)    
        

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error')
    }

}) ;
//get all profiles

router.get('/',async (req,res)=>{
try{
    const profiles = await Profile.find().populate('user',['name','avatar']);
    res.json(profiles)

}
catch(err){
    console.log(err.message);
    res.status(500).send('Server error');
}

});

//get profile by user id

router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);

        if(!profile) return res.status(400).json({masg:'profile is not found'})
        res.json(profile)
    
    }
    catch(err){
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({masg:'profile not found'})
        }
        res.status(500).send('Server error');
    }
    
    });

//delete profile and user

    router.delete('/',auth,async (req,res)=>{
        try{
             await Profile.findOneAndRemove({user: req.user.id})
             await User.findOneAndRemove({ _id: req.user.id})
            res.json({msg:'user deleted'})
        
        }
        catch(err){
            console.log(err.message);
            res.status(500).send('Server error');
        }
        
        })    
// insert and update experience

router.put('/experience',[auth,[check('title', 'Title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'fromm is required').not().isEmpty()
    ]],async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {title,company,location,from,to,current,description } = req.body;

    const newExp={}

    if(title) newExp.title = title;
    if(company) newExp.company = company;
    if(location) newExp.location = location;
    if(from) newExp.from = from;
    if(to) newExp.to = to;
    if(current) newExp.current = current;
    if(description) newExp.description = description;

    try {
        let profile = await Profile.findOne({user:req.user.id})
        if(profile.experience){
            profile = await Profile.findOneAndUpdate({user: req.user.id},{experience: newExp},{new:true})
            return res.json(profile);
        }

        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }

    })

module.exports = router;