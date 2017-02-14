function getIDfromURL()
{
    let current_url = $(location).attr("href");
    return current_url.substring(current_url.lastIndexOf("/") + 1);
}
