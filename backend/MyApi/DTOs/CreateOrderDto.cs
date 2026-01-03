//Data Transfer Object for creating a new Order
namespace MyApi.DTOs
{
    public class CreateOrderDto
    {
        public int CarTypeId { get; set; }
        public DateOnly FromDate { get; set; }
        public DateOnly ToDate { get; set; }
        public string Username { get; set; } = null!;
        public string MobileNumber { get; set; } = null!;
        public string? Comments { get; set; }
    }

}

