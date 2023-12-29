// Burger Menu

const burgerBtn = document.getElementById('burger-btn');
const burgerMenu = document.querySelector('.burger-menu');
const burgerWrraper = document.querySelector('.burger-wrraper');
const burgerLinks = document.querySelectorAll('.burger-menu__link');
const burgerClose = document.querySelector('.burger-menu__icon');

const hideBurgerMenu = () => {
    document.body.style.overflow = '';
    burgerWrraper.classList.remove('flex');
    burgerMenu.classList.remove('show');
    burgerBtn.classList.remove('active');
}
const showBurgerMenu = () => {
    document.body.style.overflow = 'hidden';
    burgerWrraper.classList.add('flex');
    burgerMenu.classList.add('show');
    burgerBtn.classList.add('active');
}

const toggleBurgerMenu = () => {
    if (burgerMenu.classList.contains('show')) {
        hideBurgerMenu()
    } else {
        showBurgerMenu()
    }
};

burgerBtn.addEventListener('click', toggleBurgerMenu);

burgerLinks.forEach(link => {
    link.addEventListener('click', toggleBurgerMenu);
})

burgerClose.addEventListener('click', hideBurgerMenu)

//  Select

const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? 'placeholder не указан'

    const items = data.map(item => {
        let cls = ''
        if (item.id === selectedId) {
            text = item.value
            cls = 'selected'
        }
        return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}"><a href='${item.link}'>${item.value}</a></li>`
    })
    return `
    <input type="hidden" class="hidden__input">
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
        <svg class="select__icon" width="16" height="10" viewBox="0 0 16 10" data-type="arrow">
              <use xlink:href="#selectArrow"></use>
        </svg>
    </div>
    <div class="select__dropdown">
        <ul class="select__list">
            ${items.join('')}
        </ul>
    </div>
`
}
class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.render()
        this.setup()
    }

    render() {
        const { placeholder, data } = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
    }
    setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');
    }

    clickHandler(event) {
        const { type } = event.target.dataset;
        if (type === 'input') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;

        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => el.classList.remove('selected'));
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

        this.options.onSelect ? this.options.onSelect(this.current) : null;
        this.close();
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$el.classList.add('open');
        this.$arrow.classList.add('open');
    }

    close() {
        this.$el.classList.remove('open');
        this.$arrow.classList.remove('open');
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}

try {
    const headerSelect = new Select('.header__select', {
        placeholder: 'Меню',
        selectedId: '1',
        data: [
            { id: 'journal', value: 'Журналы', link: './journal.html' },
            { id: 'author', value: 'Авторам', link: './author.html' },
            { id: 'contact', value: 'Контакты', link: './contact.html' },
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })
} catch (error) {
    console.log('Элемент не найден на странице');
}

try {
    const headerInsuranceSelect = new Select('.header__insurance-select', {
        placeholder: 'Меню',
        selectedId: '1',
        data: [
            { id: 'journal', value: 'Архив', link: '#' },
            { id: 'author', value: 'Авторам', link: './author.html' },
            { id: 'contact', value: 'Контакты', link: './contact.html' },
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })
} catch (error) {
    console.log('Элемент не найден на странице');
    console.log(error)
}


// slider

const bookSlider = new Swiper('.book-slider', {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 24,
    simulateTouch: true,
});

const marketSlider = new Swiper('.market-slider', {
    navigation: {
        nextEl: '.slider-arrow-next',
        prevEl: '.slider-arrow-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 0,
    simulateTouch: true,
    loop: true,
    speed: 800,
});


// tags

function goArray(nodeList) {
    const array = [];
    for (const node of nodeList) {
        array.push(node);
    }
    return array;
}

function hiddenElements(array, numberOfEl) {
    let i = 0;
    const hiddenElArray = [];

    for (let el in array) {
        i++;
        if (i < numberOfEl) continue;
        else {
            array[el].classList.add('none');
            hiddenElArray.push(array[el]);
        }
    }

    return hiddenElArray;
}

function opacityTags(blocksArray) {
    let i = 0;

    for (let tag in blocksArray) {
        i++;
        if (i < 3) continue;
        else {
            blocksArray[tag].classList.add('opacity-07');
        }
    }
}

function showTags(btn, array, block) {
    for (let tag of array) {
        if (tag.classList.contains('none')) {
            tag.classList.remove('none');
        }
        if (tag.classList.contains('opacity-07')) {
            tag.classList.remove('opacity-07');
        }
    }
    btn.classList.add('none');
    block.classList.add('tags__block--active');
}

try {
    const moreBtnUp = document.querySelector('.tags__btn--up');
    const moreBtnDown = document.querySelector('.tags__btn--down');
    const tagBlocksUp = document.querySelectorAll('.tag-block--up');
    const tagBlocksDown = document.querySelectorAll('.tag-block--down');
    const upperBlock = document.querySelector('.tags__block--up');
    const downBlock = document.querySelector('.tags__block--down');
    const tagBlocksUpArray = goArray(tagBlocksUp);
    const tagBlocksDownArray = goArray(tagBlocksDown);

    hiddenElements(tagBlocksUpArray, 6);
    opacityTags(tagBlocksUpArray);
    hiddenElements(tagBlocksDownArray, 6);
    opacityTags(tagBlocksDownArray);

    moreBtnUp.addEventListener('click', () => {
        showTags(moreBtnUp, tagBlocksUpArray, upperBlock);
    });

    moreBtnDown.addEventListener('click', () => {
        showTags(moreBtnDown, tagBlocksDownArray, downBlock);
    });
} catch {
    console.log('Элемент не найден на этой странице');
}


// download more

try {
    const allMoreBtn = document.querySelectorAll('.documents__btn')

    allMoreBtn.forEach(btn => {
        const btnContainer = btn.parentElement;
        const list = btnContainer.parentElement;
        const allItems = list.querySelectorAll('.documents__item');
        const gradient = list.querySelector('.gradient');
        const allItemsArray = goArray(allItems);

        const hiddenElementsArray = hiddenElements(allItemsArray, 4);

        btn.addEventListener('click', () => {
            for (let hiddenEl of hiddenElementsArray) {
                hiddenEl.style.display = 'block';
            }
            gradient.classList.add('gradient--none');
            btn.style.display = 'none';
        })
    })
} catch {
    console.log('Элемент не найден на этой странице');
}

// copy

try {
    const allCopy = document.querySelectorAll('.contact__copy');

    allCopy.forEach(copy => {
        const header = copy.parentElement;
        const card = header.parentElement;

        const dscr = card.querySelector('.contact__dscr');

        copy.addEventListener('click', () => {
            const message = document.createElement('p');
            message.classList.add('succsess-copy');
            message.textContent = 'Скопировано';
            header.append(message);

            setTimeout(() => message.remove(), 2000);
            navigator.clipboard.writeText(dscr.textContent);
        })
    })
} catch {
    console.log('Текст не скопирован');
}

// more insurance journal

try {
    const moreBtnInsurance = document.querySelector('.i-about__more');
    const hiddenBlockInsurance = document.querySelector('.i-about__hidden-block');
    const hiddenBtnInsurance =  document.querySelector('.i-about__hidden');

    moreBtnInsurance.addEventListener('click', () => {
        hiddenBlockInsurance.style.display = 'block';
        moreBtnInsurance.style.display = 'none';
    })

    hiddenBtnInsurance.addEventListener('click', () => {
        hiddenBlockInsurance.style.display = 'none';
        moreBtnInsurance.style.display = 'block';
    })
} catch {
    console.log('Элемент не найден на странице');
}

// Accordion

try {

    const allAccordionItem = document.querySelectorAll('.accordion-item__header');
    const allAccordionAnswer = document.querySelectorAll('.accordion-item__body');

    let i = 0;

    for (let itemHeader of allAccordionItem) {
        i++;
        if (i === 4) {
            const item = itemHeader.parentNode;
            const body = item.querySelector('.accordion-item__body');
            const answer = itemHeader.nextElementSibling;
            const svgIcon = itemHeader.querySelector('.accordion-item__icon');
            svgIcon.classList.add('accordion-item__icon--active');
            itemHeader.classList.add('accordion-item__header--active');
            answer.style.maxHeight = (answer.scrollHeight) + 'px';
        }
    }

    allAccordionItem.forEach(item => {
        item.addEventListener('click', () => {
            let answer = item.nextElementSibling;
            let svgIcon = item.querySelector('.accordion-item__icon');

            if (answer.style.maxHeight) {
                allAccordionAnswer.forEach(body => {
                    body.style.maxHeight = null;
                })
                svgIcon.classList.remove('accordion-item__icon--active');
                item.classList.remove('accordion-item__header--active');
            } else {
                allAccordionAnswer.forEach(body => {
                    body.style.maxHeight = null;
                })
                answer.style.maxHeight = answer.scrollHeight + 'px';
                svgIcon.classList.add('accordion-item__icon--active');
                item.classList.add('accordion-item__header--active');
            }
        })
    })
} catch {
    console.log('Элемент не найден на странице');
}