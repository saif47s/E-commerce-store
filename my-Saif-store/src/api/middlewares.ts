import { defineMiddlewares } from "@medusajs/medusa"
import express from "express"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/static/*",
            middlewares: [express.static("static")],
        },
        {
            matcher: "/admin/*",
            middlewares: [
                (req, res, next) => {
                    const originalJson = res.json;
                    const LIVE_URL = "https://saiff47-saif-medusa-store.hf.space";

                    res.json = function (obj) {
                        try {
                            if (obj && typeof obj === 'object') {
                                // Stringify the object to easily replace all instances of localhost
                                let strBody = JSON.stringify(obj);
                                if (strBody.includes('http://localhost:9000') || strBody.includes('http://127.0.0.1:9000')) {
                                    strBody = strBody.replace(/http:\/\/(localhost|127\.0\.0\.1):9000/g, LIVE_URL);
                                    // Parse it back to an object and pass to original res.json
                                    return originalJson.call(this, JSON.parse(strBody));
                                }
                            }
                        } catch (e) {
                            console.error("Middleware URL rewrite error", e);
                        }
                        return originalJson.call(this, obj);
                    };
                    next();
                }
            ],
        },
    ],
})
