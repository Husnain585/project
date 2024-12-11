const { createUser, getAllUser, updateUser, deleteUser, get } = require("../models/userModel");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");
const responseHandler = require("../responsHandler");

const { models } = require("../models");
const { response } = require("express");

module.exports = {
    create: async (req, res) => {
        try {
            const response = await createUser(req.body);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, { response: error });
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await getAllUser(req.query);
            return responseHandler(res, response);
        } catch (error) {
            console.log("not working");
            
            return responseHandler(res, {response: error});
        }
    },
    get: async (req, res) => {
        try {
            const user = await get(req.query);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, {response: error});
        }
    },
    update: async (req, res) => {
        try {
            const response = await updateUser(req.body);
            return responseHandler(res, response);
        } catch (error) {
            console.log(error)
            return responseHandler(res, {response : error});
        }
    },
    deleteUser: async (req, res) => {
        try {
            const response = await deleteUser(req.query);
            return responseHandler(res, req.query);
        } catch (error) {
            return responseHandler(res, {response : error});
        }
    },
};