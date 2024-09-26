const { Company } = require("../models/company.model.js");


const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .send({ message: "Company name is required", sucsess: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .send({ message: "You can't register same company", sucsess: false });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).send({
      message: "Company register successfully",
      company,
      sucsess: true,
    });
  } catch (error) {}
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .send({ message: "Company not found", sucsess: false });
    }
    return res.status(200).send({ companies, sucsess: true });
  } catch (error) {
    console.log(error);

  }
};

//get company by id
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .send({ message: "Company not found", sucsess: false });
    }
    return res.status(200).send({ company, sucsess: true });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file; //cloudinary data
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res
        .status(404)
        .send({ message: "Company not found.", sucsess: true });
    }
    return res
      .status(200)
      .send({ message: "Company informantion updated", sucsess: true });
  } catch (error) {}
};

module.exports={
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany,
}