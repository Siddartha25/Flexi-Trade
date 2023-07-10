var item="NO ITEM SELECTED";
    
const popup=document.getElementById("popup");
const picture=document.getElementById("pic");
const data=document.getElementById("info");

function showitem1(){
    item="Nike Air2";
    picture.style.background="url('https://images.unsplash.com/photo-1515555230216-82228b88ea98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1926&q=80') no-repeat center center/cover";
    data.innerHTML="COST:$100<br />Product Desc:Nike generally uses high-quality materials to make their Air Max lineage.\n"+"They use durable materials that could add to the longevity of the sneakers<br />Cash on Delivery";
    popup.style.display='block';
}
function showitem2(){
    item="Addidas Shoe";
    picture.style.background="url('https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80');no-repeat center center/cover";
    data.innerHTML="COST:$150<br />Product Desc:Adidas is a German multinational corporation, founded and headquartered in Herzogenaurach\n"+"that designs and manufactures shoes, clothing and accessories.<br />Cash on Delivery\n";
    popup.style.display='block';
}
function showitem3(){
    item="supreme t-shirt";
    picture.style.background= "url('https://images.unsplash.com/photo-1545921095-3e9b7ae8d85f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1123&q=80');no-repeat center center/cover";
    data.innerHTML="COST:$250<br />Product Desc:Supreme is an American clothing and skateboarding lifestyle brand established in New York City in April 1994.<br />Cash on Delivery\n";
    popup.style.display='block';
}
function showitem4(){
    item="Rayban Sunglasses";
    picture.style.background="url('https://images.unsplash.com/photo-1660593212134-52f2ac133a1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') no-repeat center center/cover";
    data.innerHTML="COST:$50<br />Product Desc:Ray-Ban is an American-Italian brand of luxury sunglasses and eyeglasses created in 1936 by Bausch & Lomb.\n"+"The brand is known for its Aviator lines of sunglasses.<br />Cash on Delivery";    
    popup.style.display='block';
}
function showitem5(){
    item="Denim Jeans";
    picture.style.background="url('https://images.unsplash.com/photo-1574809736435-dced6ecf6ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80');no-repeat center center/cover";
    data.innerHTML="COST:$30<br />Product Desc:Denim is a sturdy cotton twill fabric woven with an indigo, gray, or mottled white yarn.\n"+"Denim is perhaps one of the most well-known and commonly worn fabrics.<br />Cash on Delivery";  
    popup.style.display='block';
    
}
function showitem6(){
    item="Silver Bracelet";
    picture.style.background= "url('https://plus.unsplash.com/premium_photo-1674677530230-e3ca6f8ea2d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=453&q=80');no-repeat center center/cover";
    data.innerHTML="COST:$60<br />Product Desc: A statement piece for bold and fashionable men\n"+"This silver bracelet is ideal for everyday office wear. Made with 925 Sterling Silver.<br />Cash on Delivery";  
    popup.style.display='block';
}
function showitem7(){
    item="Gucci Bag";
    picture.style.background="url('https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80');no-repeat center center/cover";
    data.innerHTML="COST:$300<br />Product Desc: Gucci is an Italian luxury brand of fashion, clothing and leather goods and one of the current highest-selling Italian brands.\n"+" Gucci was founded by Guccio Gucci in Florence, Tuscany, in 1921.<br />Cash on Delivery\n";  
    popup.style.display='block';
}
function showitem8(){
    item="Guicci Belt";
    picture.style.background="url('https://images.unsplash.com/photo-1608461864721-b8f50c91c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80') no-repeat center center/cover";
    data.innerHTML="COST:$150<br />Product Desc: Gucci is an Italian luxury brand of fashion, clothing and leather goods and one of the current highest-selling Italian brands.\n"+" Gucci was founded by Guccio Gucci in Florence, Tuscany, in 1921.<br />Cash on Delivery\n";  
    popup.style.display='block';
}
function closeinfo(){
    console.log("closed");
    popup.style.display='none';
}

module.exports= {item};
