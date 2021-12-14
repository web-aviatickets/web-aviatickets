const header = document.querySelector('h2');

const getCookies = (name) => {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const getResource = () => {
  JSON.parse(getCookies('flight_info')).forEach(({flight_date, flight_duration, flight_id, flight_name, from, to, ticket_price}) => {
      new TicketCard(flight_date, flight_duration, flight_id, flight_name, from, to, ticket_price).render();
  });
}

class TicketCard {
    constructor(date, duration, id, name, from, to, price) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.price = price;
        this.classes = "ticket";
        this.parent = document.querySelector("section");
    }

    render() {
        const element = document.createElement('div');
        element.classList.add(this.classes);
        header.innerHTML = `Результати пошуку (${this.from}-${this.to}):`
        element.innerHTML = `
        <div class="wrapper-inner">
          <div class="ticket_block">
            <div class="ticket_block_logo"><img src="../img/windrose.png" class="id" alt="${this.id}"></div>
            <hr>
            <div class="ticket_block_info">
              <div class="ticket_block_info_way">
                <div class="ticket_block_info_way_from">
                  ${this.date.split('T')[0]}
                  <br>
                  ${this.from}
                </div>
                <div class="ticket_block_info_way_arrow">
                  <div class="ticket_block_info_way_arrow_text">
                    <div class="ticket_block_info_way_arrow_text_info">${this.name}</div>
                    <div class="ticket_block_info_way_arrow_text_info">${this.duration.split(':')[0]} год ${this.duration.split(':')[1]} хв</div>
                  </div>
                  <span></span>
                  <div class="ticket_block_info_way_arrow_text">
                    <div class="ticket_block_info_way_arrow_text_info">Економ клас (L)</div>
                    <div class="ticket_block_info_way_arrow_text_info">Багаж 23K</div>
                  </div>
                </div>
                <div class="ticket_block_info_way_to">
                ${this.date.split('T')[0]}
                  <br>
                  ${this.to}
                </div>
              </div>
              <div class="ticket_block_info_time">
                <div class="ticket_block_info_time_text">
                  Час у дорозі:
                  <br>
                  ${this.duration.split(':')[0]} год ${this.duration.split(':')[1]} хв
                </div>
              </div>
            </div>
            <hr>
            <div class="ticket_block_choose">
              <div class="ticket_block_choose_text">Мінімальна ціна за квиток:</div>
              <div class="ticket_block_choose_text">${this.price} грн</div>
              <div class="ticket_block_choose_btn">
                <a href="/book"><button id="${this.id}">Далі</button></a>
              </div>
            </div>
          </div>
        </div>
            `;
        this.parent.append(element);
    }
}

getResource();

