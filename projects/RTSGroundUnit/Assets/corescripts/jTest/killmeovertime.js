var lifetime = 1.0;

function Awake()
{
	Destroy(gameObject,lifetime);
}