using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Encodings.Web;

public class MenuController: Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult GetMenu()
    {
        var result = new MenuViewModel()
        {
            products = new List<ProductViewModel>(){
                new ProductViewModel(){
                    name = "Pizza (32cm)",
                    price = 1230,
                    rating = 8.9,
                    ingredients = "pizza szósz, paradicsom, sonka",
                    category = "pizza",
                    ratingCount = 123,
                    imageUrl = "https://img.etimg.com/thumb/msid-68680996,width-643,imgsize-1492594,resizemode-4/pizza.jpg"
                },
                new ProductViewModel(){
                    name = "Pizza (32cm) vékony",
                    price = 1830,
                    rating = 10.0,
                    ingredients = "paradicsom, sonka, kolbász, sajt",
                    category = "pizza",
                    ratingCount = 80,
                    imageUrl = "https://img.etimg.com/thumb/msid-68680996,width-643,imgsize-1492594,resizemode-4/pizza.jpg"
                },
                new ProductViewModel(){
                    name = "Pizza (40cm)",
                    price = 1530,
                    rating = 9.5,
                    ingredients = "pizza szósz, paradicsom, sonka",
                    category = "pizza",
                    ratingCount = 12,
                    imageUrl = "https://img.etimg.com/thumb/msid-68680996,width-643,imgsize-1492594,resizemode-4/pizza.jpg"
                }
            }
        };

        return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(result));
    }
}