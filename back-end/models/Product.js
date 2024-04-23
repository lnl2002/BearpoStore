import mongoose, { Schema } from "mongoose";
import Category from "./Category.js";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, // Thêm trường mô tả sản phẩm
        required: true // Hoặc tùy chọn, tùy thuộc vào yêu cầu của bạn
    },
    importPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    discountTime: {
        type: Date
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true 
    },
    isCombo: {
        type: Boolean,
        default: false // Thêm trường để chỉ định sản phẩm có phải là combo hay không, mặc định là false
    }
}, {
    timestamps: true
});


const Product = mongoose.model('products', productSchema);
export default Product;