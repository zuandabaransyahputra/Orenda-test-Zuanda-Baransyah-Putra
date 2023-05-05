// import model
const { Order, DetailOrder, Product } = require("../models");
const sequelize = require("../models").sequelize;

class OrderController {
  static async findAll(req, res) {
    const orders = await Order.findAll({
      include: [
        {
          model: DetailOrder,
          as: "details",
        },
      ],
    });
    return res.status(200).json({ status: "success", data: orders });
  }

  static async create(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { customerId, products } = req.body;

      const resOrder = await Order.create(
        {
          date: new Date(),
          sum: 0,
          customerId,
        },
        { transaction }
      );

      let sum = 0;
      let temp = [];
      for (const product of products) {
        const checkingProduct = await Product.findOne({
          where: { id: product.id },
        });

        if (!checkingProduct)
          res.status(404).json({ message: "Product Not found" });

        if (product.qty > checkingProduct.unit)
          res.status(404).json({ message: "Stock Product tidak cukup" });

        await checkingProduct.update(
          {
            unit: checkingProduct.unit - product.qty,
          },
          { transaction }
        );

        temp.push({
          productId: checkingProduct.id,
          qty: product.qty,
          orderId: resOrder.id,
          price: checkingProduct.price,
        });

        sum += checkingProduct.price * product.qty;
      }

      const resDetailOrders = await DetailOrder.bulkCreate(temp, {
        transaction,
      });

      await resOrder.update(
        {
          sum,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json({
        status: "success",
        data: { ...resOrder.dataValues, details: resDetailOrders },
      });
    } catch (err) {
      if (transaction) await transaction.rollback();

      res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    }
  }
}

module.exports = OrderController;
