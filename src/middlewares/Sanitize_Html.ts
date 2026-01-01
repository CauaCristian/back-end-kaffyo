import {RequestHandler} from "express";
import * as sanitizeHtml from "sanitize-html";
import { sanitizeConfig } from "../configs/Sanitize_Config";

function deepSanitize(value: any,depth = 0,nodeCounter = { count:0 }): any {
    if (depth > sanitizeConfig.max_depth) {

        throw new Error("Payload muito profundo");

    }

    nodeCounter.count++;
    if (nodeCounter.count > sanitizeConfig.max_nodes) {

        throw new Error("Payload muito grande");

    }

    if (typeof value === "string") {

        return sanitizeHtml.default(value, {
            allowedTags: [],
            allowedAttributes: {},
        });

    }

    if (Array.isArray(value)) {

        if (value.length > sanitizeConfig.max_array_length) {

            throw new Error("Array muito grande");

        }

        return value.map(item => deepSanitize(item, depth + 1, nodeCounter));

    }

    if (typeof value === "object" && value !== null) {

        const sanitized: any = {};
        for (const key in value) {
            sanitized[key] = deepSanitize(value[key], depth + 1, nodeCounter);
        }
        return sanitized;

    }

    return value;

}

export const sanitizeHTML:RequestHandler = (req,res,next)=>{

    try {

        req.body = deepSanitize(req.body);
        req.query = deepSanitize(req.query);
        req.params = deepSanitize(req.params);
        next();

    } 
    catch (err: any) {

        res.status(400).json({
        message: err.message || "Payload inválido",
        });

    }

}