using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Encodings.Web;

public class ContactsController: Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult GetContactList()
    {
        var result = new List<ContactModel>()
        {
            new ContactModel() {
                firstName = "Alma",
                lastName = "Naracs",
                phones = new List<PhoneModel>(){
                    new PhoneModel(){
                        type = "Mobile",
                        number = "123123123"
                    },
                    new PhoneModel(){
                        type = "Work",
                        number = "1215"
                    },
                }
            },
            new ContactModel() {
                firstName = "Dinnye",
                lastName = "Naracs",
                phones = new List<PhoneModel>(){
                    new PhoneModel(){
                        type = "Mobile",
                        number = "111111"
                    },
                    new PhoneModel(){
                        type = "Work",
                        number = "2222222"
                    },
                }
            }
        };

        return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(result));
    }
}