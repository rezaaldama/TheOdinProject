import stringToNode from "./stringToNode.js";
import chefIcon from "./chef.svg";

function createHomePage() {
  const content = document.getElementById("content");

  const homeString = `<section id="about" class="bg-dark text-light text-center min-vh-100 p-5">
                      <div class="container">
                        <div
                          class="d-sm-flex align-items-center justify-content-between my-5"
                        >
                          <div class="text-start w-50">
                            <h2 class="my-4">
                              The best <span class="text-danger">foodName</span> restaurant in
                              <span class="text-warning">yourCityName</span>
                            </h2>
                            <p class="lead">
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                              Voluptatibus id nobis temporibus natus facilis dolorum!
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                              eum amet totam explicabo perferendis fugiat ipsa quidem
                              deserunt, obcaecati delectus minus harum ad reprehenderit
                              sapiente asperiores suscipit necessitatibus repellendus
                              provident aut libero. Fuga, natus? Saepe architecto nam animi.
                              Qui quam porro aliquid veniam quod nobis illo ratione modi
                              itaque odit!
                            </p>
                          </div>
                          <div>
                            <img src="${chefIcon}" alt="Chef Icon" width="200" />
                            <img
                              src="${chefIcon}"
                              alt="Chef Icon"
                              width="150"
                              style="transform: scaleX(-1)"
                            />
                          </div>
                        </div>
                      </div>
                    </section>`;

  const homeNode = stringToNode(homeString);

  content.appendChild(homeNode);
}

export default createHomePage;
