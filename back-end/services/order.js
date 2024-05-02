import Order from "../models/Order.js";

const dashboardStatic = async (fromDate, toDate) => {
    try {
        var condition;
        var total = 0;
        var totalProfit = 0;
        // var map = new Map();
        // const monthAbbreviations = [
        //     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        // ];


        if (fromDate === '' && toDate === '') { //Case: getAll
            condition = {}
        } else {
            //Case: get by date
            condition = {
                createdAt: {
                    $gte: fromDate,
                    $lte: toDate
                }
            }
        }

        const dashboardStatic = await Order.find(condition, 'total totalProfit createdAt');

        for (let i = 0; i < dashboardStatic.length; i++) {
            total += dashboardStatic[i].total;
            totalProfit += dashboardStatic[i].totalProfit;

            // let month = dashboardStatic[i].createdAt.getMonth(); // thang bat dau tu 0
            // if(map.has(monthAbbreviations[month])) {
            //     map.set(monthAbbreviations[month])
            // } else {

            // }
        }

        return {
            total,
            totalProfit,
            numberOrder: dashboardStatic.length
        }

    } catch (error) {
        console.log('Service: dashboardStatic', error);
    }
}

const getRevenueProfitByYear = async (year) => {
    try {
        const profits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const revenues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const revAndPro = await Order.find({
            createdAt: {
                $gte: `${year}-01-01`,
                $lte: `${year}-12-31`
            }
        }, 'total totalProfit createdAt')

        revAndPro.forEach(element => {
            let month = element.createdAt.getMonth(); //start at 0

            profits[month] += element.totalProfit;
            revenues[month] += element.total;
        })


        return {
            revenues,
            profits,
            year
        };
    } catch (error) {
        console.log('Service: getRevenueProfitByYear', error);
    }
};
const createOrder = async(orderData) => {
    try {
        return await Order.create(orderData);
    } catch (error) {
        throw new Error(error);
    }
}
//getAllOrder with Condtion
const getAllOrder = async (page, numberPerPage, condition) => {
    try {
      const orders = await Order.find(condition)
        .sort({createdAt: 1, _id: 1})
        .skip((page - 1) * numberPerPage)
        .limit(numberPerPage);
      return orders;
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
};
//getOrderById
const getOrderById = async () => {
    try {
      return await Order.find({id});
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
};


export default {
    dashboardStatic,
    getRevenueProfitByYear,
    createOrder,
    getAllOrder,
    getOrderById
}