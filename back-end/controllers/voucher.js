import * as voucherService from "../services/voucher.js";

export const createVoucher = async (req, res, next) => {
    try {
        const voucher = await voucherService.createVoucher(req.body);
        res.status(201).json(voucher);
    } catch (error) {
        next(error);
    }
};

export const getAllVouchers = async (req, res, next) => {
    try {
        const vouchers = await voucherService.getAllVouchers();
        res.status(200).json(vouchers);
    } catch (error) {
        next(error);
    }
};

export const getVoucherByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const voucher = await voucherService.getVoucherByCode(code);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }
        res.status(200).json(voucher);
    } catch (error) {
        next(error);
    }
};

export const updateVoucher = async (req, res, next) => {
    try {
        const { code } = req.params;
        const voucher = await voucherService.updateVoucher(code, req.body);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }
        res.status(200).json(voucher);
    } catch (error) {
        next(error);
    }
};

export const deleteVoucher = async (req, res, next) => {
    try {
        const { code } = req.params;
        await voucherService.deleteVoucher(code);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    createVoucher,
    getAllVouchers,
    getVoucherByCode,
    updateVoucher,
    deleteVoucher
};
