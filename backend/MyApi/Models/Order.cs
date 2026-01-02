namespace MyApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CarTypeId { get; set; }
        public CarType CarType { get; set; } = null!;

        public DateOnly FromDate { get; set; }
        public DateOnly ToDate { get; set; }

        public string Username { get; set; } = null!;
        public string MobileNumber { get; set; } = null!;
        public string? Comments { get; set; }
    }

}

