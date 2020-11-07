using Newtonsoft.Json;
using System.Collections.Generic;


namespace CRUD2020.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        [JsonIgnore]
        public virtual ICollection<Sales> Sales { get; set; }
    }
}
