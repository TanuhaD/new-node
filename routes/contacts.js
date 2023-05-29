const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const { Contact } = require("../models/contactsShema");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const joi = require("joi");
const contactShema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const getAll = async (req, res) => {
  // const contacts = await readContacts();
  const contacts = await Contact.find({});
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.json({ message: "contact not found" });
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { error } = contactShema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  }
  const result = await Contact.create({ name, email, phone });
  res.json(result);
};

const updateContactById = async (req, res) => {
  const { name, email, phone } = req.body;
  const { error } = contactShema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );
  res.json(result);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  res.json({ message: " okey" });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  res.json(result);
};

router.get("/", ctrlWrapper(getAll));
router.get("/:id", ctrlWrapper(getContactById));
router.post("/", ctrlWrapper(addContact));
router.put("/:id", ctrlWrapper(updateContactById));
router.delete("/:id", ctrlWrapper(removeContactById));
router.patch("/:id/favorite", ctrlWrapper(updateStatusContact));
module.exports = router;
