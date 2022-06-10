$.confirm = function(options) {
    return new Promise((resolve, reject)=>{
        const modal = $.modal({
            title: options.title,
            width: "400px",
            closable: false,
            content: options.content,
            onClose () {
                modal.destroy();
            },
            footerButtons: [
                {
                    text: "\u041E\u0442\u043C\u0435\u043D\u0430",
                    type: "secondary",
                    handler () {
                        modal.close();
                        reject();
                    }
                },
                {
                    text: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
                    type: "danger",
                    handler () {
                        modal.close();
                        resolve();
                    }
                }
            ]
        });
        setTimeout(()=>modal.open(), 100);
    });
};

//# sourceMappingURL=index.5965a50f.js.map
