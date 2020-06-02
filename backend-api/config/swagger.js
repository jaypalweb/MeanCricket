var swagger = {};
swagger.options = function (port) {
    // Extended: https://swagger.io/specification/#infoObject
    return {
        swaggerDefinition: {
            info: {
                version: "1.0.0",
                title: "Project API",
                description: "Project API Information",
                contact: {
                    name: "Jay Pal"
                },
                servers: ["http://localhost:" + port]
            }
        },
        apis: ['./routers/*.js']
    }
}

module.exports = swagger;