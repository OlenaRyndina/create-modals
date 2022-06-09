$.modal = function(options1) {
    Element.prototype.appendAfter = function(element) {
        element.parentNode.insertBefore(this, element.nextSibling);
    };
    function noop() {}
    function _createModalFooter(buttons = []) {
        if (buttons.length === 0) return document.createElement("div");
        const wrap = document.createElement("div");
        wrap.classList.add("modal-footer");
        buttons.forEach((btn)=>{
            const $btn = document.createElement("button");
            $btn.textContent = btn.text;
            $btn.classList.add("btn");
            $btn.classList.add(`btn-${btn.type || "secondary"}`);
            $btn.onclick = btn.handler || noop;
            wrap.appendChild($btn);
        });
        return wrap;
    }
    function createModal(options) {
        const DEFAULT_WIDTH = "600px";
        const modal = document.createElement("div");
        modal.classList.add("base-modal");
        modal.insertAdjacentHTML("afterbegin", `
             <div class="modal-overlay" data-close="true">
			<div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
				<div class="modal-header">
					<span class="modal-title">${options.title || "\u041E\u043A\u043D\u043E"}</span>
					${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ""}
				</div>
				<div class="modal-body" data-content>
					${options.content || ""}
				</div>
			</div>
		</div>
        `);
        const footer = _createModalFooter(options.footerButtons);
        footer.appendAfter(modal.querySelector("[data-content]"));
        document.body.appendChild(modal);
        return modal;
    }
    const $modal = createModal(options1);
    const ANIMATION_SPEED = 200;
    let closing = false;
    let destroyed = false;
    const modal1 = {
        open () {
            if (destroyed) return console.log("Modal is destroyed");
            !closing && $modal.classList.add("open");
        },
        close () {
            closing = true;
            $modal.classList.remove("open");
            $modal.classList.add("hide");
            setTimeout(()=>{
                $modal.classList.remove("hide");
                closing = false;
            }, ANIMATION_SPEED);
        }
    };
    const listener = (event)=>{
        if (event.target.dataset.close) modal1.close();
    };
    $modal.addEventListener("click", listener);
    return Object.assign(modal1, {
        destroy () {
            $modal.parentNode.removeChild($modal);
            destroyed = true;
            $modal.removeEventListener("click", listener);
        },
        setContent (html) {
            $modal.querySelector("[data-content]").innerHTML = html;
        }
    });
};

//# sourceMappingURL=index.edd3fdd2.js.map
