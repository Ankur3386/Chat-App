import { v2 as cloudinary } from 'cloudinary';

const uploadOnCloudinary = async(localFilePath)=>{
    
    try {
            if (!localFilePath) return null;
        const uploadResult = await cloudinary.uploader
        .upload(localFilePath,{
         resource_type:'auto'
        }
        )
    } catch (error) {
        console.log("Error uploading image in cloudinary");
    }
   
 
 console.log(uploadResult);
}
export default uploadOnCloudinary ;

    
    
     
    
   
    
       
