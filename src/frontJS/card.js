const {getCookie, setCookie} = required('./cookies.js');

const cards = () => {
    class MenuCard {
        constructor(id, name, date, from, to, duration) {
            this.id = id;
            this.name = name;
            this.date = date;
            this.from = from;
            this.to = to;
            this.duration = duration; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "ticket_block_info_way";
                element.classList.add(this.classes);
            }

            element.innerHTML = `
            <div class="ticket_block_info_way_from">
            ${this.date.toString()}
            <br>
            ${this.from}
          </div>
          <div class="ticket_block_info_way_arrow">
            <div class="ticket_block_info_way_arrow_text">
              <div class="ticket_block_info_way_arrow_text_info">${this.name}</div>
              <div class="ticket_block_info_way_arrow_text_info">${this.duration}</div>
            </div>
            <span></span>
            <div class="ticket_block_info_way_arrow_text">
              <div class="ticket_block_info_way_arrow_text_info">Економ клас (L)</div>
              <div class="ticket_block_info_way_arrow_text_info">Багаж 23K</div>
            </div>
          </div>
          <div class="ticket_block_info_way_to">
            11:30 22 вер
            <br>
            ${this.to}
          </div>
            `;
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

}

export default cards;