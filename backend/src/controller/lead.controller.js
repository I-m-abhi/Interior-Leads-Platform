import Lead from "../models/lead.model.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

export const createLead = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const lead = await Lead.create(req.body);
  res.status(201).json({
    sucess: true,
    lead
  })
})

export const getAllLeads = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 20;
  const apiFeatures = new APIFunctionality(Lead.find(), req.query)
    .search()
    .filter();

  // Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const totalLeads = await filteredQuery.countDocuments();

  // Calculating total pages
  const totalPages = Math.ceil(totalLeads / resultPerPage);
  const currentPage = Number(req.query.page) || 1;

  if (currentPage > totalPages && totalLeads > 0) {
    return next(new HandleError("This page does not exist", 404));
  }

  // Applying pagination
  apiFeatures.pagination(resultPerPage);

  const leads = await apiFeatures.query;

  if (!leads || leads.length === 0) {
    return next(new HandleError("No Leads Found", 404));
  }

  res.status(200).json({
    success: true,
    leads,
    totalLeads,
    resultPerPage,
    totalPages,
    currentPage
  })
})

export const updateLead = handleAsyncError(async (req, res, next) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    // useFindAndModify: false
  });

  if (!lead) {
    return next(new HandleError("Lead Not Found", 404));
  }

  res.status(200).json({
    success: true,
    lead
  });
})

export const deleteLead = handleAsyncError(async (req, res, next) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    return next(new HandleError("Lead Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Lead Deleted Successfully"
  });
})

export const getLeadDetails = handleAsyncError(async (req, res, next) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return next(new HandleError("Lead Not Found", 404));
  }

  res.status(200).json({
    success: true,
    lead
  });
})