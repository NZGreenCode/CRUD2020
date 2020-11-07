using Newtonsoft.Json;
using System.Collections.Generic;


namespace CRUD2020.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        [JsonIgnore]
        public virtual ICollection<Sales> Sales { get; set; }
    }
}
