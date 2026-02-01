import stringToNode from "./stringToNode.js";

function createMenuPage() {
  const content = document.getElementById("content");

  const menuString = `<section id="menu" class="bg-white text-center min-vh-100 p-5">
                      <div class="container">
                        <h2 class="p-5 mt-5">Our Menu</h2>
                        <div class="row g-4">
                          <div class="col">
                            <div class="card" style="width: 18rem">
                              <img
                                src="https://foodish-api.com/images/pizza/pizza7.jpg"
                                id="food-img"
                              />
                              <div class="card-body">
                                <p class="card-text">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                  Aliquam recusandae optio doloribus, praesentium corrupti
                                  excepturi!
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="card" style="width: 18rem">
                              <img
                                src="https://foodish-api.com/images/pizza/pizza10.jpg"
                                id="food-img"
                              />
                              <div class="card-body">
                                <p class="card-text">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                  Beatae, quos!
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="card" style="width: 18rem">
                              <img
                                src="https://foodish-api.com/images/pizza/pizza5.jpg"
                                id="food-img"
                              />
                              <div class="card-body">
                                <p class="card-text">
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                  Doloremque unde dolorum earum ipsum libero, provident
                                  necessitatibus quia quisquam temporibus corporis?
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="card" style="width: 18rem">
                              <img
                                src="https://foodish-api.com/images/pizza/pizza8.jpg"
                                id="food-img"
                              />
                              <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>`;

  const menuNode = stringToNode(menuString);

  content.appendChild(menuNode);
}

export default createMenuPage;
