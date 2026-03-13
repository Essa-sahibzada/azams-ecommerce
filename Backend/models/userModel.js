import mongoose from 'mongoose';

// "Row" ki jagah "Schema" use karein
const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String 
    },
    isAdmin: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    googleId: { 
        type: String 
    },
    image: { 
        type: String 
    }
}, {
    timestamps: true // Is se createdAt aur updatedAt khud ban jayenge
});

const User = mongoose.model('User', userSchema);

export default User;