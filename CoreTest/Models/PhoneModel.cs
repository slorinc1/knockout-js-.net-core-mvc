using System.Collections.Generic;

public class PhoneModel{

    public string type {get; set;}

    public string number {get; set;}
}

public class ContactModel
{
    public string firstName {get; set;}

    public string lastName {get; set;}

    public List<PhoneModel> phones {get; set;}
}