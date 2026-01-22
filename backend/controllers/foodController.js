import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// add food item
const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save()
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood = async (req,res) => {
    try{
    const foods = await foodModel.find({})
    res.json({success:true,data:foods})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

// reomove food items
const removeFood = async (req,res) => {
    try{
        const food = await foodModel.findById(req.body.id)
        const imagePath = path.join(__dirname, '..', 'uploads', food.image);
        
        // Check if file exists before trying to delete
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
    }catch(error){
        console.error('Error in removeFood:', error)
        res.json({success:false,message:"Error removing food"})
    }
}

export {addFood,listFood,removeFood} 
