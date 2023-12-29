const products = document.querySelector('#products')
const productsAxios = document.querySelector('#productsAxios')

const requestURL = 'https://estrooo.github.io/Labs_for_Sem/LR6/json/index.json';

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';

request.send();

request.onload = (e) => {
    const productList = request.response;
    generateProducts(productList, products);
    cartFunc(products);
}

axios.get(requestURL).then(response=>{
    const productList = response.data;
    generateProducts(productList, productsAxios);
    cartFunc(productsAxios);
})

function generateProducts(productList, wrapper){
    productList.products.forEach(
        (product) => {
            const panel = document.createElement('div');
            panel.classList.add('panel','swiper-slide'); 

            if (product.note !== null){
                const note = document.createElement('div');
                note.classList.add('note', product.note);
                const noteSpan = document.createElement('span');
                if (product.note == "new")
                    noteSpan.textContent = 'новинка';
                else if(product.note == "hit")
                    noteSpan.textContent = 'хіт продажів';
                note.append(noteSpan);
                panel.append(note);
            }
            
            const categoryBlock = document.createElement('div');
            categoryBlock.classList.add('categor');
            const category = document.createElement('a');
            category.textContent = product.category;
            categoryBlock.append(category);
            panel.append(categoryBlock);

            const line = document.createElement('hr');
            panel.append(line);

            const pictureBlock = document.createElement('div');
            pictureBlock.classList.add('pic');
            const pictureLink = document.createElement('a');
            pictureLink.href = product.link;
            const pictureImg = document.createElement('img');
            pictureImg.src = product.image;
            pictureImg.alt = 'img';
            
            pictureLink.append(pictureImg);
            pictureBlock.append(pictureLink);
            panel.append(pictureBlock);

            const productName = document.createElement('div');
            productName.classList.add('prod', 'bold');
            const productLink = document.createElement('a');
            productLink.href = product.link;
            productLink.textContent = product.name;
            productLink.title = product.name;
            productName.append(productLink);
            panel.append(productName);

            const priceBlock = document.createElement('div');
            priceBlock.classList.add('costs','bold');
            const oldPrice = document.createElement('span');
            oldPrice.classList.add('old-price')
            if (product.oldPrice !== null){
                oldPrice.textContent = product.oldPrice + ' грн' 
            }
            priceBlock.append(oldPrice, "\u00A0");

            const price = document.createElement('span');
            price.classList.add('price');
            if(product.price !== null){
                price.textContent = product.price + ' грн';
            }
            priceBlock.append(price);
            panel.append(priceBlock);

            const buyBlock = document.createElement('div');
            const buyBtn = document.createElement('a');
            buyBtn.classList.add('btn', 'bold');
            if(product.available === true){
                buyBtn.classList.add('avl');
                buyBtn.textContent = 'У корзину';
                buyBtn.href = '#';
            }
            else{
                buyBtn.classList.add('soon');
                buyBtn.textContent = 'незабаром у продажі';
            }
            buyBlock.append(buyBtn);
            panel.append(buyBlock);
            wrapper.append(panel);
        }
    ); 
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 0,
    grabCursor: false,
    navigation: {
      nextEl: "#wrap1 .rightsw",
      prevEl: "#wrap1 .leftsw",
    },  
});
var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 0,
    grabCursor: false,
    navigation: {
      nextEl: "#wrap2 .rightsw",
      prevEl: "#wrap2 .leftsw",
    },  
});