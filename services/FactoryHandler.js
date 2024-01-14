const asynchandler = require("express-async-handler");
const ErroFrom = require("../utils/ErrorForm");
const GetFeatures = require("../utils/GetFeature");

exports.CreateElement = (module) =>
  asynchandler(async (req, res, next) => {
    const doucement = await module.create(req.body);
    return res.status(201).json({ data: doucement });
  });

exports.UpdateElement = (module) =>
  asynchandler(async (req, res, next) => {
    const doucement = await module.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!doucement) return next(new ErroFrom("doucement not found", 404));

    return res.status(200).json({ data: doucement });
  });

exports.GetElementById = (module, option) =>
  asynchandler(async (req, res, next) => {
    let doucement;
    if (option=="book") {
      const per_doucement = await module
        .findOne({ _id: req.params.id })
        .populate("reviews");
      if(per_doucement.reviews?.length > 0 ) doucement = await  per_doucement.populate("reviews.user");
      else doucement =  per_doucement;
    } else {
      doucement = await module.findOne({ _id: req.params.id });
    }
    if (!doucement) return next(new ErroFrom("doucement not found", 404));

    return res.status(200).json({ data: doucement });
  });

exports.DeleteElement = (module) =>
  asynchandler(async (req, res, next) => {
    const doucement = await module.findOne({ _id: req.params.id });
    if (!doucement) return next(new ErroFrom("doucement not found", 404));
    await doucement.deleteOne();
    return res.status(200).json({ success: true });
  });

exports.GetElements = (model, option) =>
  asynchandler(async (req, res, next) => {
    const totaleDoucement = await model.countDocuments();

    const { module, pagination } = new GetFeatures(model, req.query)
      .Filtre()
      .FieldsBy()
      .Pagination(totaleDoucement)
      .SortBy()
      .SearchBy();

    let doucements;
    if (option == "order")
      doucements = await module.populate("address cardItems.book");
    else doucements = await module;

    return res.status(200).json({ data: doucements, pagination });
  });
