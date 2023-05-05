// import model
const { DetailOrder } = require("../models");

class DetailOrderController {
  static async findAll(req, res) {
    const orders = await DetailOrder.findAll();
    return res.status(200).json({ status: "success", data: orders });
  }
}

module.exports = DetailOrderController;
