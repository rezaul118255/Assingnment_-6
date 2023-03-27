const loaddata = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`
    const res = await fetch(url);
    const data = await res.json();
    displaydata(data.data.tools);

}
const displaydata = cards => {
    // console.log(datas)
    const datascontainer = document.getElementById('card-container');
    // see all section
    const showall = document.getElementById('moreBtn');
    if (cards.length > 6) {
        // cards = cards.slice(0, 6);
        moreBtn.classList.remove('d-none');
    }
    else {
        moreBtn.classList.add('d-none');
    }
    document.getElementById('btn-show-all').addEventListener('click', function () {
        displaydata(cards)
    })
    // sort by date section
    const sorting = (a, b) => {
        const datea = new Date(a.published_in);
        const dateb = new Date(b.published_in);
        if (datea > dateb) {
            return -1;

        }
        else {
            return 0;
        }
    };
    document.getElementById('sort-date').addEventListener('click', function () {
        const sortdate = data.published_in.sort(sorting);
        console.log(sortdate)
    })



    // set spinner section
    const spinner = document.getElementById('spinner');
    if (cards.length > 0) {

        spinner.classList.add('d-none');
    }
    else {
        spinner.classList.remove('d-none');
    }


    cards.forEach(data => {
        const { id } = data
        console.log(id)
        const carddiv = document.createElement('div');
        // const { id } = data
        carddiv.classList.add('col');
        // togglespinner(true);
        carddiv.innerHTML = ` <div class="card h-100">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol>
                <li>${data.features[0] ? data.features[0] : "No data found"}</li>
                <li>${data.features[1] ? data.features[1] : "No data found"}</li>
                <li>${data.features[2] ? data.features[2] : "No data found"}</li>
    
                
            </ol >
        </div >
    <div class="card-footer">
        <h5 class="card-title">${data.name}</h5>
        <div class="d-flex">
            <i class="fa fa-calendar mt-1 mx-2"></i>
            <p>date:${data.published_in}</p>
        </div>
       
    
    
             <button class="btn btn-primary" onclick="loacard('${id}')" mx-auto text-align-right data-bs-toggle="modal" data-bs-target="#exampleModal">see detais</button>
        </div>
    </div>
    
    `;
        datascontainer.appendChild(carddiv);

    });
}
const loacard = (id) => {
    console.log(id)
    // const url = `https://openapi.programming-hero.com/api/ai/tool/01`;
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    // console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaymodal(data.data));

};


const displaymodal = cards => {
    // console.log(cards)

    const datascontainer = document.getElementById('modal-container');
    const carddiv = document.createElement('div');
    carddiv.classList.add('col');
    carddiv.innerHTML = `
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${cards.description}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="modal-content  ">
                              <div class="col border">
                        
                                 <div class="modal-body d-flex style="border:3px solid red">
                                 <div  style="height: 80px;width: 100px;border: 1px solid rebeccapurple;color: forestgreen;padding: 5px;">
                                 <div class=""> ${cards.pricing[0].price} </div>
                                 <div class=""> ${cards.pricing[0].plan} </div>
                                 </div>
                                 <div style="height: 80px;width: 100px;border: 1px solid rebeccapurple;color: forestgreen;padding: 5px;">
                                 <div> ${cards.pricing[1].price}</div>
                                 <div>${cards.pricing[1].plan} </div>
                                 </div>
                                 <div style="height: 80px;width: 100px;border: 1px solid rebeccapurple;color: forestgreen;padding: 5px;">
                                 <div>${cards.pricing[2].plan} </div>
                                 <div> ${cards.pricing[2].price}</div>
                                 </div>
                                
                               
                               
                               
                               </div>
                            <div class="d-flex">
                                <div>
                                    <h5>Features</h5>
                                    <ul>
                                        <li>${cards.features['1'].feature_name ? cards.features['1'].feature_name : "No data found"}</li>
                                        <li>${cards.features['2'].feature_name ? cards.features['2'].feature_name : "No data found"}</li>
                                        <li>${cards.features['3'].feature_name ? cards.features['3'].feature_name : "No data found"}</li>
                                       
                                    </ul>
                                </div>
                                <div>
                                    <h5>Integrations</h5>
                                    <ul>
                                        <li>${cards.integrations[0] ? cards.integrations[0] : "No data found"}</li>
                                        <li>${cards.integrations[1] ? cards.integrations[1] : "No data found"}</li>
                                        <li>${cards.integrations[1] ? cards.integrations[1] : "No data found"}</li>
                                        
                                </div>
                            </div>
    
                        </div>
                        <div class="">
                            <div class="card p-3" style="height: 300px;width: 450px;" >
                            <img class="card-img-top img-fluid" src="${cards.image_link[0]}" alt="">
    
                            </div>
                            <h6>${cards.input_output_examples[0].input}</h>
                            <h6>${cards.input_output_examples[0].output}</h6>
    
                        </div>
    
    
    
    
                    </div>
                          
                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           
                        </div>
                    </div>
                </div>
            </div>
        
    `;
    datascontainer.appendChild(carddiv);


}

// 
// spinner section
const togglespinner = isloading => {
    const loadersection = document.getElementById('spinner');
    if (isloading) {
        loadersection.classList.remove('d-none')
    }
    else {
        loadersection.classList.add('d-none')
    }
}
loaddata()